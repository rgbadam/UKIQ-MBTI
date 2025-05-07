const namesList = [
  {
    _id: "name1",
    nameUyghur: "ئالىيە",
    nameChinese: "阿丽叶",
    nameLatin: "Aliye",
    gender: "female",
    meaning: "يۇقىرى دەرىجىلىك، ئالىي. ئەرەبچە سۆز.",
    description: "بۇ ئىسىم ئەرەبچە بولۇپ يۇقىرى دەرىجىلىك، ئالىي دېگەن مەنىنى بىلدۈرىدۇ. بۇ ئىسىم ئۇيغۇرلار ئارىسىدا ناھايىتى مەشھۇر. بۇ ئىسىم قىز بالىلارغا قويۇلىدۇ.",
    popularity: 95,
    origin: "ئەرەبچە"
  },
  {
    _id: "name2",
    nameUyghur: "ئەكبەر",
    nameChinese: "阿克拜尔",
    nameLatin: "Ekber",
    gender: "male",
    meaning: "ئەڭ چوڭ، ئەڭ ئۇلۇغ. ئەرەبچە سۆز.",
    description: "بۇ ئىسىم ئەرەبچە بولۇپ ئەڭ چوڭ، ئەڭ ئۇلۇغ دېگەن مەنىلەرنى بىلدۈرىدۇ. بۇ ئىسىم ئۇيغۇرلار ئارىسىدا ناھايىتى كەڭ تارقالغان. بۇ ئىسىم ئوغۇل بالىلارغا قويۇلىدۇ.",
    popularity: 88,
    origin: "ئەرەبچە"
  },
  {
    _id: "name3",
    nameUyghur: "گۈلنۇر",
    nameChinese: "古丽努尔",
    nameLatin: "Gülnur",
    gender: "female",
    meaning: "گۈل ۋە نۇر بىرلەشمىسى، نۇرلۇق گۈل.",
    description: "بۇ ئىسىم گۈل ۋە نۇر سۆزلىرىنىڭ بىرلەشمىسى بولۇپ، نۇرلۇق گۈل دېگەن مەنىنى بىلدۈرىدۇ. پارسچە ۋە تۈركىي تىللاردىن كەلگەن بۇ گۈزەل ئىسىم قىز بالىلارغا قويۇلىدۇ.",
    popularity: 92,
    origin: "پارسچە-تۈركىي"
  },
  {
    _id: "name4",
    nameUyghur: "ئەرشات",
    nameChinese: "艾尔夏提",
    nameLatin: "Ershat",
    gender: "male",
    meaning: "ئەر ۋە شات بىرلەشمىسى، خۇشال ئەر.",
    description: "بۇ ئىسىم تۈركىي تىللاردىن كەلگەن بولۇپ، ئەر ۋە شات (خۇشال) سۆزلىرىنىڭ بىرلەشمىسى، خۇشال ئەر دېگەن مەنىنى بىلدۈرىدۇ. ئەرشات ئىسمى ئوغۇل بالىلارغا قويۇلىدۇ.",
    popularity: 85,
    origin: "تۈركىي"
  },
  {
    _id: "name5",
    nameUyghur: "پەرىدە",
    nameChinese: "帕丽达",
    nameLatin: "Peride",
    gender: "female",
    meaning: "پەرىشتىدەك، پەرىگە ئوخشاش گۈزەل.",
    description: "بۇ ئىسىم پارسچە بولۇپ پەرىشتىدەك، پەرىگە ئوخشاش گۈزەل دېگەن مەنىنى بىلدۈرىدۇ. پەرىدە ئىسمى قىز بالىلارغا قويۇلىدۇ.",
    popularity: 90,
    origin: "پارسچە"
  },
  {
    _id: "name6",
    nameUyghur: "دىلناز",
    nameChinese: "迪丽娜孜",
    nameLatin: "Dilnaz",
    gender: "female",
    meaning: "دىل ۋە ناز بىرلەشمىسى، نازلىق يۈرەك.",
    description: "بۇ ئىسىم دىل (يۈرەك) ۋە ناز سۆزلىرىنىڭ بىرلەشمىسى بولۇپ، نازلىق يۈرەك دېگەن مەنىنى بىلدۈرىدۇ. دىلناز ئىسمى قىز بالىلارغا قويۇلىدۇ.",
    popularity: 94,
    origin: "پارسچە-تۈركىي"
  },
  {
    _id: "name7",
    nameUyghur: "تۇرسۇن",
    nameChinese: "吐尔逊",
    nameLatin: "Tursun",
    gender: "male",
    meaning: "تۇرسۇن، ئۆمۈرلۈك بولسۇن.",
    description: "بۇ ئىسىم ئۇيغۇرچە-تۈركىي بولۇپ، تۇرسۇن، ئۆمۈرلۈك بولسۇن دېگەن مەنىنى بىلدۈرىدۇ. بۇ ئىسىم ئوغۇل بالىلارغا قويۇلىدۇ.",
    popularity: 80,
    origin: "ئۇيغۇرچە-تۈركىي"
  },
  {
    _id: "name8",
    nameUyghur: "ئايگۈل",
    nameChinese: "艾古丽",
    nameLatin: "Aygül",
    gender: "female",
    meaning: "ئاي ۋە گۈل بىرلەشمىسى، ئايدەك گۈزەل گۈل.",
    description: "بۇ ئىسىم ئاي ۋە گۈل سۆزلىرىنىڭ بىرلەشمىسى بولۇپ، ئايدەك گۈزەل گۈل دېگەن مەنىنى بىلدۈرىدۇ. ئايگۈل ئىسمى قىز بالىلارغا قويۇلىدۇ.",
    popularity: 88,
    origin: "تۈركىي"
  },
  {
    _id: "name9",
    nameUyghur: "مەمەت",
    nameChinese: "买买提",
    nameLatin: "Memet",
    gender: "male",
    meaning: "مۇھەممەد ئىسمىنىڭ قىسقارتىلمىسى، ماختالغان كىشى.",
    description: "بۇ ئىسىم مۇھەممەد ئىسمىنىڭ قىسقارتىلمىسى بولۇپ، ماختالغان كىشى دېگەن مەنىنى بىلدۈرىدۇ. بۇ ئىسىم ئوغۇل بالىلارغا قويۇلىدۇ.",
    popularity: 90,
    origin: "ئەرەبچە"
  },
  {
    _id: "name10",
    nameUyghur: "نۇرىيە",
    nameChinese: "努丽叶",
    nameLatin: "Nuriye",
    gender: "female",
    meaning: "نۇرلۇق، يورۇق.",
    description: "بۇ ئىسىم ئەرەبچە بولۇپ نۇرلۇق، يورۇق دېگەن مەنىلەرنى بىلدۈرىدۇ. نۇرىيە ئىسمى قىز بالىلارغا قويۇلىدۇ.",
    popularity: 87,
    origin: "ئەرەبچە"
  },
  {
    _id: "name11",
    nameUyghur: "ئالىم",
    nameChinese: "阿力木",
    nameLatin: "Alim",
    gender: "male",
    meaning: "بىلىملىك، ئالىم.",
    description: "بۇ ئىسىم ئەرەبچە بولۇپ بىلىملىك، ئالىم دېگەن مەنىلەرنى بىلدۈرىدۇ. بۇ ئىسىم ئوغۇل بالىلارغا قويۇلىدۇ.",
    popularity: 85,
    origin: "ئەرەبچە"
  },
  {
    _id: "name12",
    nameUyghur: "گۈلباھار",
    nameChinese: "古丽巴哈尔",
    nameLatin: "Gülbahar",
    gender: "female",
    meaning: "گۈل ۋە باھار بىرلەشمىسى، باھاردىكى گۈل.",
    description: "بۇ ئىسىم گۈل ۋە باھار سۆزلىرىنىڭ بىرلەشمىسى بولۇپ، باھاردىكى گۈل دېگەن مەنىنى بىلدۈرىدۇ. گۈلباھار ئىسمى قىز بالىلارغا قويۇلىدۇ.",
    popularity: 82,
    origin: "پارسچە-تۈركىي"
  },
  {
    _id: "name13",
    nameUyghur: "ئەزىز",
    nameChinese: "阿孜孜",
    nameLatin: "Eziz",
    gender: "male",
    meaning: "قەدىرلىك، قىممەتلىك.",
    description: "بۇ ئىسىم ئەرەبچە بولۇپ قەدىرلىك، قىممەتلىك دېگەن مەنىلەرنى بىلدۈرىدۇ. بۇ ئىسىم ئوغۇل بالىلارغا قويۇلىدۇ.",
    popularity: 83,
    origin: "ئەرەبچە"
  },
  {
    _id: "name14",
    nameUyghur: "زۇمرەت",
    nameChinese: "祖姆热提",
    nameLatin: "Zumret",
    gender: "female",
    meaning: "زۇمرەت تاش، يېشىل قىممەتلىك تاش.",
    description: "بۇ ئىسىم پارسچە-ئەرەبچە بولۇپ زۇمرەت تاش، يېشىل قىممەتلىك تاش دېگەن مەنىلەرنى بىلدۈرىدۇ. زۇمرەت ئىسمى قىز بالىلارغا قويۇلىدۇ.",
    popularity: 80,
    origin: "پارسچە-ئەرەبچە"
  },
  {
    _id: "name15",
    nameUyghur: "ئەكرەم",
    nameChinese: "艾克热木",
    nameLatin: "Ekrem",
    gender: "male",
    meaning: "ئەڭ سېخى، ئەڭ ھۆرمەتلىك.",
    description: "بۇ ئىسىم ئەرەبچە بولۇپ ئەڭ سېخى، ئەڭ ھۆرمەتلىك دېگەن مەنىلەرنى بىلدۈرىدۇ. بۇ ئىسىم ئوغۇل بالىلارغا قويۇلىدۇ.",
    popularity: 81,
    origin: "ئەرەبچە"
  },
  {
    _id: "name16",
    nameUyghur: "شىرىن",
    nameChinese: "西丽努尔",
    nameLatin: "Shirin",
    gender: "female",
    meaning: "تاتلىق، يېقىملىق.",
    description: "بۇ ئىسىم پارسچە بولۇپ تاتلىق، يېقىملىق دېگەن مەنىلەرنى بىلدۈرىدۇ. شىرىن ئىسمى قىز بالىلارغا قويۇلىدۇ.",
    popularity: 84,
    origin: "پارسچە"
  },
  {
    _id: "name17",
    nameUyghur: "ئەقىدە",
    nameChinese: "艾可达",
    nameLatin: "Eqide",
    gender: "female",
    meaning: "ئەقىدىسى كۈچلۈك، ئىشەنچى بار، سادىق، پالۋان كەبى",
    description: "بۇ ئىسىم ئىقىدىسى كۈچلۈك، بىر ئىشلارغا ئىشەنچى بار دېگەن مەنىدەرنى بىلدۈرىدۇ. بۇ قىز ئوغۇل بالىلارغا قويۇلىدۇ.",
    popularity: 81,
    origin: "ئەرەبچە"
  }
];

// Utility functions for accessing the mock data
const mockAPI = {
  // Get all names
  getAllNames: function() {
    return namesList;
  },
  
  // Get name by ID
  getNameById: function(id) {
    return namesList.find(name => name._id === id) || null;
  },
  
  // Get popular names
  getPopularNames: function(count = 8) {
    return [...namesList]
      .sort((a, b) => b.popularity - a.popularity)
      .slice(0, count);
  },
  
  // Get names by gender
  getNamesByGender: function(gender) {
    return namesList.filter(name => name.gender === gender);
  },
  
  // Get related names (same gender, different ID)
  getRelatedNames: function(id, count = 4) {
    const currentName = this.getNameById(id);
    if (!currentName) return [];
    
    return namesList
      .filter(name => name.gender === currentName.gender && name._id !== id)
      .sort(() => 0.5 - Math.random())
      .slice(0, count);
  },
  
  // Search names by query
  searchNames: function(query) {
    if (!query || query.trim() === '') return [];
    
    query = query.toLowerCase();
    return namesList.filter(name => 
      name.nameUyghur.includes(query) || 
      name.nameLatin.toLowerCase().includes(query) || 
      name.nameChinese.includes(query)
    );
  }
};

module.exports = {
  namesList,
  mockAPI
}; 