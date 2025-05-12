// pages/search/search.js
const { mockAPI } = require('../../../utils/mockData');

Page({
  data: {
    query: '',
    allNames: [],
    displayNames: [],
    loading: true,
    isFocused: false,
    searchText: ''
  },

  onLoad: function() {
    this.loadData();
  },

  loadData: function() {
    // Get all names
    const allNames = mockAPI.getAllNames();
    
    // Sort names by Uyghur name
    allNames.sort((a, b) => a.nameUyghur.localeCompare(b.nameUyghur));
    
    this.setData({
      allNames,
      displayNames: allNames,
      loading: false
    });
  },

  onInput: function(e) {
    const query = e.detail.value;
    this.setData({ query });
    
    // Filter names based on query
    this.filterNames(query);
  },

  filterNames: function(query) {
    if (!query) {
      this.setData({ displayNames: this.data.allNames });
      return;
    }
    
    const lowerQuery = query.toLowerCase();
    
    const filteredNames = this.data.allNames.filter(name => 
      name.nameUyghur.includes(lowerQuery) ||
      name.nameChinese.includes(lowerQuery) ||
      name.nameLatin.toLowerCase().includes(lowerQuery)
    );
    
    this.setData({ displayNames: filteredNames });
  },

  clearSearch: function() {
    this.setData({
      query: '',
      searchText: '',
      displayNames: this.data.allNames
    });
  },

  navigateToDetail: function(e) {
    const nameId = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `../namecard/namecard?id=${nameId}`
    });
  },

  onShareAppMessage: function() {
    return {
      title: 'ئۇيغۇرچە بالا ئىسىملىرى ئىزدەش',
      path: '/pages/names/search/search'
    };
  },

  onSearchFocus: function() {
    this.setData({ isFocused: true });
  },

  onSearchBlur: function() {
    this.setData({ isFocused: false });
  },

  onSearchInput: function(e) {
    const searchText = e.detail.value;
    this.setData({ searchText });
    this.filterNames(searchText);
  },

  navigateBack: function() {
    wx.navigateBack();
  }
}); 