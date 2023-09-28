<template>
    <div class="row" style="margin-top: 20px; margin-bottom: 20px;">
        <div class="col-4">2</div>
        <div class="col-8">
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
 
  /* For demo */
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