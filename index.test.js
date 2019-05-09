const imgUrlSuffix4Alioss = require('./index');
const url = 'http://sitecdn.zcy.gov.cn/zcy-front-other-upload/1920x1200_cd38f61d8d608f8.png';

test('图片定宽100压缩90%,webp', () => {
  expect(imgUrlSuffix4Alioss(url, {
    width: 100,
    quality: 90,
  })).toBe('http://sitecdn.zcy.gov.cn/zcy-front-other-upload/1920x1200_cd38f61d8d608f8.png?x-oss-process=image/resize,w_100/quality,Q_90/format,webp');
});

test('图片定宽100高100压缩90%,webp', () => {
  expect(imgUrlSuffix4Alioss(
    url,
    {
      width: 100,
      height: 100,
      quality: 90,
    }
  )).toBe('http://sitecdn.zcy.gov.cn/zcy-front-other-upload/1920x1200_cd38f61d8d608f8.png?x-oss-process=image/resize,m_fixed,h_100,w_100/quality,Q_90/format,webp');
});

test('图片定最大边100压缩80%,webp', () => {
  expect(imgUrlSuffix4Alioss(url, {
    l: 100,
    format: 'jpg',
  })).toBe('http://sitecdn.zcy.gov.cn/zcy-front-other-upload/1920x1200_cd38f61d8d608f8.png?x-oss-process=image/resize,l_100/quality,Q_80/format,jpg');
});

test('宽100高100补白颜色FF0000', () => {
  expect(imgUrlSuffix4Alioss(url, {
    width: 100,
    height: 100,
    mPad: true,
    color: 'FF0000'
  })).toBe('http://sitecdn.zcy.gov.cn/zcy-front-other-upload/1920x1200_cd38f61d8d608f8.png?x-oss-process=image/resize,m_fixed,h_100,w_100,m_pad,color_FF0000/quality,Q_80/format,webp');
});
