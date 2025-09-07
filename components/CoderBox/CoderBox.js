Component({
  properties: {
    visible: {
      type: Boolean,
      value: false
    },
    lang: {
      type: String,
      value: 'cn'
    },
    qrCode: {
      type: String,
      value: '/images/pics/rgbadam.jpg'
    }
  },

  methods: {
    onClose() {
      this.triggerEvent('close')
    }
  }
}) 