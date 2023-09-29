<template>
    <div class="row" style="margin-top: 20px; margin-bottom: 20px;">
        <div class="col-md-4" style="display: flex;justify-content: center; align-items: center;">
            <h1 class="display-4 font-italic">Best Place <br><span style="font-size: 40px;">for</span><br> Pet Lover</h1>
        </div>
        <div class="col-md-8">
            <a-carousel autoplay>
                <div ><h3>1</h3></div>
                <div ><h3>2</h3></div>
                <div ><h3>3</h3></div>
                <div ><h3>4</h3></div>
                <div ><h3>5</h3></div>
            </a-carousel>
        </div>
    </div>      
</template>
  
  
  
  <style scoped >
 
 
  .ant-carousel :deep(.slick-slide) {
    text-align: center;
    height: 450px;
    line-height: 160px;
    background: #0072bc;
    overflow: hidden;
  }
  
  .ant-carousel :deep(.slick-slide h3) {
    color: #fff;
  }
  </style>