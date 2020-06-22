declare module '*.vue' {
  import Vue from 'vue'
  export default Vue
}

// ts vue svg 报错处理
declare module "*.svg" {
  const content: string;
  export default content;
}