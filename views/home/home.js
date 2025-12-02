const app = getApp();
const baseUrl = app.globalData.requestUrl;

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
    wx.request({
      url: `${baseUrl}/names/random`,
      method: 'POST',
      data: { count: 10 },
      success: (res) => {
        if (res.data.code === 200) {
          const randomNames = res.data.nameList || [];
          this.setData({
            randomNames,
            currentIndex: 0,
            loading: false
          }, () => {
            this.updateCardData();
          });
        } else {
          this.setData({ loading: false });
        }
      },
      fail: () => {
        this.setData({ loading: false });
      }
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
      swiping: false,
      swipeDirection: ''
    });
  },

  handleTouchMove: function(e) {
    if (this.data.animating) return;
    
    const touchMoveX = e.touches[0].clientX;
    const touchMoveY = e.touches[0].clientY;
    const diffX = touchMoveX - this.data.touchStartX;
    const diffY = touchMoveY - this.data.touchStartY;
    
    if (Math.abs(diffY) > Math.abs(diffX)) {
      this.setData({ swiping: false });
      return;
    }
    
    if (Math.abs(diffX) > 10) {
      this.setData({ swiping: true });
    }
    
    if (!this.data.swiping) return;
    
    const maxOffset = 240;
    const offset = Math.max(-maxOffset, Math.min(maxOffset, diffX));
    const swipeDirection = offset < 0 ? 'left' : (offset > 0 ? 'right' : '');
    const moveRatio = Math.pow(Math.abs(offset) / maxOffset, 0.7);
    
    this.applySwipeAnimations(offset, moveRatio);
    
    this.setData({
      touchMoveX: touchMoveX,
      swipeDirection: swipeDirection
    });
  },
  
  applySwipeAnimations: function(offset, moveRatio) {
    const { prevPrev, prev, current, next, nextNext } = ANIMATION_CONFIG.initialPosition;
    const options = { duration: 0 };
    
    const currentPos = {
      x: offset,
      z: moveRatio * 10,
      scale: 1 - moveRatio * 0.03,
      rotate: offset / 25,
      opacity: 1
    };
    this.setCardAnimation(this.animationCurrent, currentPos, options);
    
    if (offset > 0) {
      // 向右滑动时，prev卡片向前移动，更平滑的过渡
      const prevPos = {
        x: prev.x + offset * 0.7,
        z: prev.z + moveRatio * 140,
        scale: prev.scale + moveRatio * 0.18,
        rotate: prev.rotate + moveRatio * 5,
        opacity: prev.opacity + moveRatio * 0.3
      };
      this.setCardAnimation(this.animationPrev, prevPos, options);
      
      // prevPrev卡片逐渐显示 - 改进版
      const prevPrevPos = {
        x: prevPrev.x + offset * 0.4,
        z: prevPrev.z + moveRatio * 60,
        scale: prevPrev.scale + moveRatio * 0.12,
        rotate: prevPrev.rotate - moveRatio * 1,
        opacity: moveRatio * 0.9
      };
      this.setCardAnimation(this.animationPrevPrev, prevPrevPos, options);
    } else {
      // 向左滑动时前一张卡片后退 - 改进过渡
      const prevPos = {
        x: prev.x - Math.abs(offset) * 0.3,
        z: prev.z - moveRatio * 40,
        scale: prev.scale - moveRatio * 0.04,
        rotate: prev.rotate - moveRatio * 1,
        opacity: prev.opacity - moveRatio * 0.25
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
    
    if (offset < 0) {
      // 向左滑动时，next卡片向前移动 - 改进过渡
      const nextPos = {
        x: next.x + offset * 0.7,
        z: next.z + moveRatio * 140,
        scale: next.scale + moveRatio * 0.18,
        rotate: next.rotate - moveRatio * 5,
        opacity: next.opacity + moveRatio * 0.3
      };
      this.setCardAnimation(this.animationNext, nextPos, options);
      
      // nextNext卡片逐渐显示 - 改进版
      const nextNextPos = {
        x: nextNext.x + offset * 0.4,
        z: nextNext.z + moveRatio * 60,
        scale: nextNext.scale + moveRatio * 0.12,
        rotate: nextNext.rotate + moveRatio * 1,
        opacity: moveRatio * 0.9
      };
      this.setCardAnimation(this.animationNextNext, nextNextPos, options);
    } else {
      // 向右滑动时后一张卡片后退 - 改进过渡
      const nextPos = {
        x: next.x + Math.abs(offset) * 0.3,
        z: next.z - moveRatio * 40,
        scale: next.scale - moveRatio * 0.04,
        rotate: next.rotate + moveRatio * 1,
        opacity: next.opacity - moveRatio * 0.25
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
      url: '/pages/names/search/search'
    });
  },

  navigateToDetail: function(e) {
    const nameId = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/names/namecard/namecard?id=${nameId}`
    });
  },

  navigateToCategory: function(e) {
    const category = e.currentTarget.dataset.category;
    
    switch(category) {
      case 'male':
        wx.navigateTo({ url: '/pages/names/filtered/filtered?gender=male' });
        break;
      case 'female':
        wx.navigateTo({ url: '/pages/names/filtered/filtered?gender=female' });
        break;
      case 'alphabet':
        wx.navigateTo({ url: '/pages/names/alphabet/alphabet' });
        break;
      case 'favorite':
        wx.navigateTo({ url: '/pages/names/favorites/favorites' });
        break;
    }
  },

  onShareAppMessage: function() {
    return { title: 'ئىسىملار قامۇسى · 起名小助手' };
  },

  onShareTimeline: function() {
    return { title: 'ئىسىملار قامۇسى · 起名小助手', imageUrl: '/images/illust/magiccube.png' };
  }
})