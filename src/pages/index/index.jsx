import { Component } from 'react'
import { View, Text, Button, Image } from '@tarojs/components'
import Taro from '@tarojs/taro'
// import tencentcloud from 'tencentcloud-sdk-nodejs';
const crypto = require('crypto');
// import { AtButton } from 'taro-ui'

import "taro-ui/dist/style/components/button.scss" // 按需引入
import './index.scss'

const onlineUrl = 'http://159.75.111.106:3000/DetectFaceAttributes';
const selfUrl = 'http://localhost:3000/DetectFaceAttributes';
// const tempFilePaths = 'https://image-1300636809.cos.ap-nanjing.myqcloud.com/zly.jpg';

export default class Index extends Component {

  state = {
    tempFilePaths: 'https://image-1300636809.cos.ap-nanjing.myqcloud.com/zly.jpg',
    color: ''
  }

  componentWillMount() { }

  async componentDidMount() {
    // const res = await Taro.request({
    //   // url: onlineUrl,
    //   url: selfUrl,
    //   data: {
    //     "Url": "https://image-1300636809.cos.ap-nanjing.myqcloud.com/%E5%85%A5%E8%81%8C2.jpg"
    //   },
    //   method: 'POST',
    // });
    // const { FaceDetailInfos } = res.data;
    // const { FaceRect } = FaceDetailInfos[0]; // 获取面容尺寸
    // const imgSrc = await Taro.request({
    //   // url: 'http://159.75.111.106:3000/TryLipstickPic',
    //   url: 'http://localhost:3000/TryLipstickPic',
    //   data: {
    //     Url: 'https://image-1300636809.cos.ap-nanjing.myqcloud.com/%E5%85%A5%E8%81%8C2.jpg',
    //     LipColorInfos: [{ "RGBA": { "R": 255, "G": 220, "B": 0, "A": 50 }, FaceRect }],
    //     RspImgType: 'url'
    //   },
    //   method: 'POST',
    // });
    // console.log('处理后的图片', imgSrc);
  }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  // uploadImg = () => {
  //   Taro.chooseImage({
  //     count: 1,
  //     sizeType: ['original', 'compressed'],
  //     sourceType: ['album', 'camera'],
  //     success: (res) => {
  //       // tempFilePath可以作为img标签的src属性显示图片
  //       const tempFilePaths = res.tempFilePaths[0];
  //       this.setState({ tempFilePaths });
  //       const updateResult = await Taro.request({
  //         url: '',
  //         data: {},
  //         method: 'POST',
  //       })
  //       console.log(tempFilePaths, updateResult, 'tempFilePaths-tempFilePaths');
  //     }
  //   })
  // }

  chooseColor = (colorItem) => {
    this.setState({ color: colorItem }, async () => {
      let { tempFilePaths, color } = this.state;
      const startIndex = color.indexOf('(');
      const endIndex = color.indexOf(')');
      color = color.slice(startIndex + 1, endIndex).split(',');
      // if (tempFilePaths) {
      // console.log(tempFilePaths, 'tempFilePaths---tempFilePaths');
      const res = await Taro.request({
        url: onlineUrl,
        // url: selfUrl,
        data: {
          "Url": tempFilePaths
        },
        method: 'POST',
      });
      const { FaceDetailInfos } = res.data;
      const { FaceRect } = FaceDetailInfos[0]; // 获取面容尺寸
      console.log(FaceRect, color, 1111);
      const imgSrc = await Taro.request({
        url: 'http://159.75.111.106:3000/TryLipstickPic',
        // url: 'http://localhost:3000/TryLipstickPic',
        data: {
          Url: tempFilePaths,
          // LipColorInfos: [{ "RGBA": { "R": 255, "G": 220, "B": 0, "A": 50 }, FaceRect }],
          LipColorInfos: [{ "RGBA": { "R": Number(color[0]), "G": Number(color[1]), "B": Number(color[2]), "A": 50 }, FaceRect }],
          RspImgType: 'url'
        },
        method: 'POST',
      });
      // console.log('处理后的图片', imgSrc);
      this.setState({tempFilePaths: imgSrc.data.ResultUrl})
      // }
    });
  }

  render() {
    const { tempFilePaths } = this.state;
    const colorList = ['rgb(117,0,0)', 'rgb(147,0,0)', 'rgb(206,0,0)', 'rgb(234,0,0)', 'rgb(255,0,0)', 'rgb(217,0,108)', 'rgb(240,0,120)', 'rgb(255,0,128)', 'rgb(210,0,210)', 'rgb(232,0,232)', 'rgb(217,70,0)', 'rgb(247,80,0)'];
    return (
      <View className='index'>
        <Button onClick={this.uploadImg}>上传照片</Button>
        <Image
          className='image'
          mode='widthFix'
          src={tempFilePaths}
        />
        <View style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'flex-start' }}>
          {colorList.map((colorItem, index) => (
            <Text onClick={() => this.chooseColor(colorItem)} key={index.toString()} style={{ display: 'inline-block', width: 20, height: 20, backgroundColor: colorItem, borderRadius: '50%', marginRight: 10, marginTop: 10 }}></Text>
          ))}
        </View>
      </View>
    )
  }
}
