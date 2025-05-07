// pages/names/homepage/homepage.js
const { mockAPI } = require('../../../utils/mockData');

// 动画常量配置
const ANIMATION_CONFIG = {
  timingFunction: 'cubic-bezier(0.19, 1, 0.22, 1)',
  duration: 380,
  initialPosition: {
    prevPrev: { x: -140, z: -200, scale: 0.7, rotate: -12, opacity: 0 },
    prev: { x: -70, z: -120, scale: 0.85, rotate: -6, opacity: 0.8 },
    current: { x: 0, z: 0, scale: 1, rotate: 0, opacity: 1 },
    next: { x: 70, z: -120, scale: 0.85, rotate: 6, opacity: 0.8 },
    nextNext: { x: 140, z: -200, scale: 0.7, rotate: 12, opacity: 0 }
  },
  flyoutPosition: {
    leftOut: { x: -880, z: 80, scale: 0.5, rotate: -25, opacity: 0.3 },
    rightOut: { x: 280, z: 80, scale: 0.5, rotate: 25, opacity: 0.3 },
  }
};

Page({
  data: {
    loading: true,
    randomNames: [],
    currentIndex: 0,
    prevPrevCard: {},
    prevCard: {},
    currentCard: {},
    nextCard: {},
    nextNextCard: {},
    // 动画实例
    touchStartX: 0,
    touchStartY: 0,
    touchMoveX: 0,
    swiping: false,
    swipeDirection: '',
    swipeThreshold: 60,
    animating: false,
    animationPrevPrev: {},
    animationPrev: {},
    animationCurrent: {},
    animationNext: {},
    animationNextNext: {},
  },

  onLoad: function() {
    this.loadData();
    this.createAnimations();
  },

  loadData: function() {
    this.setData({ loading: true });
    this.getRandomNames();
  },

  createAnimations: function() {
    const { timingFunction, duration } = ANIMATION_CONFIG;
    const config = { duration, timingFunction, delay: 0 };

    this.animationPrevPrev = wx.createAnimation(config);
    this.animationPrev = wx.createAnimation(config);
    this.animationCurrent = wx.createAnimation(config);
    this.animationNext = wx.createAnimation(config);
    this.animationNextNext = wx.createAnimation(config);
  },

  getRandomNames: function() {
    const allNames = mockAPI.getAllNames();
    
    let randomNames = [];
    let usedIndices = new Set();
    
    const numToShow = Math.min(10, allNames.length);
    
    while (randomNames.length < numToShow) {
      const randomIndex = Math.floor(Math.random() * allNames.length);
      if (!usedIndices.has(randomIndex)) {
        usedIndices.add(randomIndex);
        randomNames.push(allNames[randomIndex]);
      }
    }
    
    this.setData({
      randomNames,
      currentIndex: 0,
      loading: false
    }, () => {
      this.updateCardData();
    });
  },
  
  updateCardData: function() {
    const { randomNames, currentIndex } = this.data;
    const len = randomNames.length;
    
    if (len === 0) return;
    
    const prevIndex = (currentIndex - 1 + len) % len;
    const prevPrevIndex = (currentIndex - 2 + len) % len;
    const nextIndex = (currentIndex + 1) % len;
    const nextNextIndex = (currentIndex + 2) % len;
    
    this.setData({
      prevPrevCard: randomNames[prevPrevIndex],
      prevCard: randomNames[prevIndex],
      currentCard: randomNames[currentIndex],
      nextCard: randomNames[nextIndex],
      nextNextCard: randomNames[nextNextIndex]
    }, () => {
      this.applyInitialPositions(false);
    });
  },
  
  applyInitialPositions: function(withAnimation = true) {
    const duration = withAnimation ? ANIMATION_CONFIG.duration : 0;
    const { prevPrev, prev, current, next, nextNext } = ANIMATION_CONFIG.initialPosition;
    const options = { duration, timingFunction: ANIMATION_CONFIG.timingFunction };
    
    this.setCardAnimation(this.animationPrevPrev, prevPrev, options);
    this.setCardAnimation(this.animationPrev, prev, options);
    this.setCardAnimation(this.animationCurrent, current, options);
    this.setCardAnimation(this.animationNext, next, options);
    this.setCardAnimation(this.animationNextNext, nextNext, options);
    
    this.setData({
      animationPrevPrev: this.animationPrevPrev.export(),
      animationPrev: this.animationPrev.export(),
      animationCurrent: this.animationCurrent.export(),
      animationNext: this.animationNext.export(),
      animationNextNext: this.animationNextNext.export(),
      swiping: false,
      swipeDirection: ''
    });
  },
  
  setCardAnimation: function(animation, position, options = {}) {
    const safeScale = Math.max(0.5, position.scale || 1);
    
    return animation
      .translateX(position.x )
      .translateZ(position.z)
      .scale(safeScale)
      .rotateY(position.rotate)
      .opacity(position.opacity)
      .step(options);
  },

  handleTouchStart: function(e) {
    if (this.data.animating) return;
    
    this.setData({
      touchStartX: e.touches[0].clientX,
      touchStartY: e.touches[0].clientY,
      swiping: true,
      swipeDirection: ''
    });
  },

  handleTouchMove: function(e) {
    if (!this.data.swiping || this.data.animating) return;
    
    const touchMoveX = e.touches[0].clientX;
    const touchMoveY = e.touches[0].clientY;
    const diffX = touchMoveX - this.data.touchStartX;
    const diffY = touchMoveY - this.data.touchStartY;
    
    // 如果垂直滑动大于水平滑动，不处理
    if (Math.abs(diffY) > Math.abs(diffX)) return;
    
    const maxOffset = 240; // 最大滑动距离增加，让滑动感更自然
    const offset = Math.max(-maxOffset, Math.min(maxOffset, diffX));
    
    // 使用更平滑的曲线计算滑动比例
    const swipeDirection = offset < 0 ? 'left' : (offset > 0 ? 'right' : '');
    
    // 使用更平滑的渐变曲线
    const moveRatio = Math.pow(Math.abs(offset) / maxOffset, 0.7);
    
    this.applySwipeAnimations(offset, moveRatio);
    
    this.setData({
      touchMoveX: touchMoveX,
      swipeDirection: swipeDirection
    });
  },
  
  // 滑动动画逻辑 - 优化版
  applySwipeAnimations: function(offset, moveRatio) {
    const { prevPrev, prev, current, next, nextNext } = ANIMATION_CONFIG.initialPosition;
    const options = { duration: 0 };
    
    // 优化当前卡片动画，增加微妙缩放和阴影效果
    const currentPos = {
      x: offset,
      z: moveRatio * 10, // 增加Z轴移动，增强3D效果
      scale: 1 - moveRatio * 0.03, // 更微妙的缩放变化
      rotate: offset / 25, // 更柔和的旋转角度
      opacity: 1
    };
    this.setCardAnimation(this.animationCurrent, currentPos, options);
    
    // 前一张卡片动画 - 优化版
    if (offset > 0) {
      // 向右滑动时，prev卡片向前移动，更平滑的过渡
      const prevPos = {
        x: prev.x + offset * 0.7, // 增加比例，让卡片跟随更快
        z: prev.z + moveRatio * 140, // 增加Z轴差异
        scale: prev.scale + moveRatio * 0.18, // 更明显的缩放
        rotate: prev.rotate + moveRatio * 5, // 调整旋转角度
        opacity: prev.opacity + moveRatio * 0.3 // 更明显的透明度变化
      };
      this.setCardAnimation(this.animationPrev, prevPos, options);
      
      // prevPrev卡片逐渐显示 - 改进版
      const prevPrevPos = {
        x: prevPrev.x + offset * 0.4,
        z: prevPrev.z + moveRatio * 60, // 增加深度
        scale: prevPrev.scale + moveRatio * 0.12,
        rotate: prevPrev.rotate - moveRatio * 1, // 轻微反向旋转增加层次感
        opacity: moveRatio * 0.9 // 更高的不透明度
      };
      this.setCardAnimation(this.animationPrevPrev, prevPrevPos, options);
    } else {
      // 向左滑动时前一张卡片后退 - 改进过渡
      const prevPos = {
        x: prev.x - Math.abs(offset) * 0.3, // 增加比例
        z: prev.z - moveRatio * 40, // 更明显地向后
        scale: prev.scale - moveRatio * 0.04, // 轻微缩小强调远离
        rotate: prev.rotate - moveRatio * 1, // 轻微旋转
        opacity: prev.opacity - moveRatio * 0.25 // 更清晰的淡出
      };
      this.setCardAnimation(this.animationPrev, prevPos, options);
      
      // prevPrev卡片隐藏 - 保持不变
      const prevPrevPos = {
        x: prevPrev.x,
        z: prevPrev.z,
        scale: prevPrev.scale,
        rotate: prevPrev.rotate,
        opacity: 0
      };
      this.setCardAnimation(this.animationPrevPrev, prevPrevPos, options);
    }
    
    // 后一张卡片动画 - 优化版
    if (offset < 0) {
      // 向左滑动时，next卡片向前移动 - 改进过渡
      const nextPos = {
        x: next.x + offset * 0.7, // 增加比例，让卡片跟随更快
        z: next.z + moveRatio * 140, // 增加Z轴差异
        scale: next.scale + moveRatio * 0.18, // 更明显的缩放
        rotate: next.rotate - moveRatio * 5, // 调整旋转角度
        opacity: next.opacity + moveRatio * 0.3 // 更明显的透明度变化
      };
      this.setCardAnimation(this.animationNext, nextPos, options);
      
      // nextNext卡片逐渐显示 - 改进版
      const nextNextPos = {
        x: nextNext.x + offset * 0.4,
        z: nextNext.z + moveRatio * 60, // 增加深度
        scale: nextNext.scale + moveRatio * 0.12,
        rotate: nextNext.rotate + moveRatio * 1, // 轻微反向旋转增加层次感
        opacity: moveRatio * 0.9 // 更高的不透明度
      };
      this.setCardAnimation(this.animationNextNext, nextNextPos, options);
    } else {
      // 向右滑动时后一张卡片后退 - 改进过渡
      const nextPos = {
        x: next.x + Math.abs(offset) * 0.3, // 增加比例
        z: next.z - moveRatio * 40, // 更明显地向后
        scale: next.scale - moveRatio * 0.04, // 轻微缩小强调远离
        rotate: next.rotate + moveRatio * 1, // 轻微旋转
        opacity: next.opacity - moveRatio * 0.25 // 更清晰的淡出
      };
      this.setCardAnimation(this.animationNext, nextPos, options);
      
      // nextNext卡片隐藏 - 保持不变
      const nextNextPos = {
        x: nextNext.x,
        z: nextNext.z,
        scale: nextNext.scale,
        rotate: nextNext.rotate,
        opacity: 0
      };
      this.setCardAnimation(this.animationNextNext, nextNextPos, options);
    }
    
    this.setData({
      animationPrevPrev: this.animationPrevPrev.export(),
      animationPrev: this.animationPrev.export(),
      animationCurrent: this.animationCurrent.export(),
      animationNext: this.animationNext.export(),
      animationNextNext: this.animationNextNext.export()
    });
  },

  handleTouchEnd: function(e) {
    if (!this.data.swiping || this.data.animating) return;
    
    const diffX = this.data.touchMoveX - this.data.touchStartX;
    
    // 根据滑动距离决定是切换卡片还是恢复位置
    if (diffX < -this.data.swipeThreshold) {
      // 向左滑，显示下一张
      this.navigateToNextCard();
    } else if (diffX > this.data.swipeThreshold) {
      // 向右滑，显示上一张
      this.navigateToPrevCard();
    } else {
      // 滑动距离不够，恢复位置
      this.applyInitialPositions(true);
    }
    
    this.setData({
      swiping: false,
      swipeDirection: ''
    });
  },

  navigateToNextCard: function() {
    this.navigateCard('next');
  },

  navigateToPrevCard: function() {
    this.navigateCard('prev');
  },
  
  navigateCard: function(direction) {
    if (this.data.animating) return;
    
    this.setData({ animating: true });
    
    // 使用简单的单阶段动画，卡片平滑滑动
    this.setupSimpleCardAnimation(direction);
    
    // 动画完成后更新索引
    setTimeout(() => {
      const len = this.data.randomNames.length;
      let newIndex;
      
      if (direction === 'next') {
        newIndex = (this.data.currentIndex + 1) % len;
      } else {
        newIndex = (this.data.currentIndex - 1 + len) % len;
      }
      
      this.setData({ 
        currentIndex: newIndex,
        animating: false
      }, () => {
        this.updateCardData();
      });
    }, ANIMATION_CONFIG.duration);
  },

  // 卡片切换动画
  setupSimpleCardAnimation: function(direction) {
    const isNext = direction === 'next';
    const { prevPrev, prev, current, next, nextNext } = ANIMATION_CONFIG.initialPosition;
    
    const options = { 
      duration: ANIMATION_CONFIG.duration, 
      timingFunction: 'cubic-bezier(0.33, 0.66, 0.66, 1)' 
    };
    
    if (isNext) {
      // 当前卡片平滑移动到prev位置
      this.setCardAnimation(this.animationCurrent, {
        x: prev.x,
        z: prev.z,
        scale: prev.scale,
        rotate: prev.rotate,
        opacity: 0
      }, {
          duration: ANIMATION_CONFIG.duration * 0.5, 
          timingFunction: 'cubic-bezier(0.33, 0.66, 0.66, 1)'
        }
      );
      
      // 前一张卡片平滑移动到prevPrev位置
      this.setCardAnimation(this.animationPrev, {
        x: prev.x,
        z: prev.z,
        scale: prev.scale,
        rotate: prev.rotate,
        opacity: prev.opacity
      }, options);
      
      // 前前张卡片移出视野
      this.setCardAnimation(this.animationPrevPrev, {
        x: prevPrev.x - 50,
        z: prevPrev.z,
        scale: 0.5,
        rotate: prevPrev.rotate - 5,
        opacity: 0
      }, options);
      
      // 下一张卡片平滑移动到current位置
      this.setCardAnimation(this.animationNext, {
        x: current.x,
        z: current.z,
        scale: current.scale,
        rotate: current.rotate,
        opacity: current.opacity
      }, options);
      
      // 下下张卡片平滑移动到next位置
      this.setCardAnimation(this.animationNextNext, {
        x: next.x,
        z: next.z,
        scale: next.scale,
        rotate: next.rotate,
        opacity: next.opacity
      }, options);
    } else {
      // 当前卡片平滑移动到next位置
      this.setCardAnimation(this.animationCurrent, {
        x: next.x,
        z: next.z,
        scale: next.scale,
        rotate: next.rotate,
        opacity: 0
      }, {
          duration: ANIMATION_CONFIG.duration * 0.5, 
          timingFunction: 'cubic-bezier(0.33, 0.66, 0.66, 1)'
        }
      );
      
      // 后一张卡片平滑移动到nextNext位置
      this.setCardAnimation(this.animationNext, {
        x: next.x,
        z: next.z,
        scale: next.scale,
        rotate: next.rotate,
        opacity: 0
      }, options);
      
      // 后后张卡片移出视野
      this.setCardAnimation(this.animationNextNext, {
        x: next.x,
        z: next.z,
        scale: next.scale,
        rotate: next.rotate,
        opacity: next.opacity
      }, options);
      
      // 前一张卡片平滑移动到current位置
      this.setCardAnimation(this.animationPrev, {
        x: current.x,
        z: current.z,
        scale: current.scale,
        rotate: current.rotate,
        opacity: current.opacity
      }, options);
      
      // 前前张卡片平滑移动到prev位置
      this.setCardAnimation(this.animationPrevPrev, {
        x: prev.x,
        z: prev.z,
        scale: prev.scale,
        rotate: prev.rotate,
        opacity: prev.opacity
      }, options);
    }
    
    this.setData({
      animationPrevPrev: this.animationPrevPrev.export(),
      animationPrev: this.animationPrev.export(),
      animationCurrent: this.animationCurrent.export(),
      animationNext: this.animationNext.export(),
      animationNextNext: this.animationNextNext.export()
    });
  },

  navigateToSearch: function() {
    wx.navigateTo({
      url: '../search/search'
    });
  },

  navigateToDetail: function(e) {
    const nameId = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `../namecard/namecard?id=${nameId}`
    });
  },

  navigateToCategory: function(e) {
    const category = e.currentTarget.dataset.category;
    
    switch(category) {
      case 'male':
        wx.navigateTo({ url: '../filtered/filtered?gender=male' });
        break;
      case 'female':
        wx.navigateTo({ url: '../filtered/filtered?gender=female' });
        break;
      case 'alphabet':
        wx.navigateTo({ url: '../alphabet/alphabet' });
        break;
      case 'favorite':
        wx.navigateTo({ url: '../favorites/favorites' });
        break;
    }
  },

  onShareAppMessage: function() {
    return { title: 'ئىسىملار قامۇسى' };
  },

  onShareTimeline: function() {
    return { title: 'ئىسىملار قامۇسى' };
  }
})