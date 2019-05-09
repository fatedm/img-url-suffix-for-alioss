# img-url-suffix-for-alioss

## 适用场景
使用上传到阿里云oss的图片，尺寸、质量不符合前端展示需求。支持根据浏览器使用webp、定图片宽高、定最大边、自定义压缩质量、补白、定义图片格式(jpg/png)。

## 安装方法
```
npm i img-url-suffix-for-alioss
```

## 使用方法
```js
import imgUrlSuffixForAlioss from 'img-url-suffix-for-alioss/index.js';
const url = imgUrlSuffixForAlioss('http://sitecdn.zcy.gov.cn/zcy-front-other-upload/1920x1200_cd38f61d8d608f8.png', {
  width: 100,
  height: 100,
  mPad: true,
  color: 'FF0000'
});
// http://sitecdn.zcy.gov.cn/zcy-front-other-upload/1920x1200_cd38f61d8d608f8.png?x-oss-process=image/resize,m_fixed,h_100,w_100,m_pad,color_FF0000/quality,Q_80/format,webp
```

## 配置项
```js
imgUrlSuffixForAlioss(url, option)
```
* url: 阿里云oss图片地址
* option
  * width: number,图片宽度
  * height: number,图片高度
  * l: number，图片最大边
  * quality: number（60-100）,图片压缩质量，默认80
  * mPad: boolean,是否补白，默认不补白
  * color: 16位颜色值, 默认白色
  * format: [jpg/png] 默认使用jpg，如果支持webp使用webp
