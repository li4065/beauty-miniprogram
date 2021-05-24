export default {
  pages: [
    'pages/index/index',
    'pages/about/index'
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#d81e06',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'white'
  },
  tabBar: {
    list: [
      {
        pagePath: 'pages/index/index',
        text: '试色',
        iconPath: 'assets/images/home.png',
        selectedIconPath: 'assets/images/home-select.png'
      },
      {
        pagePath: 'pages/about/index',
        text: '关于',
        iconPath: 'assets/images/about.png',
        selectedIconPath: 'assets/images/about-select.png'
      }
    ],
    color: '#2c2c2c',
    selectedColor: '#d81e06'
  },
}
