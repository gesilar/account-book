import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

interface IAppHeader {
  title?: string;
  backIcon?: boolean;
  onBackClick?: any;
}

const AppHeader = (props: IAppHeader) => {
  return (
    <AppBar
      position="static" 
      title={props.title}
    >
      <Toolbar>
        {props.backIcon && <ArrowBackIosIcon onClick={props.onBackClick} />}
      </Toolbar>
    </AppBar>
  )
}

export default AppHeader;

// <template>
//   <van-nav-bar
//     :title="title"
//     :left-text="back ? `返回首页` : undefined"
//     :left-arrow="back"
//     @click-left="onClickLeft"
//   >
//     <template #left>
//       <slot name="left"></slot>
//     </template>
//     <template #right>
//       <slot></slot>
//     </template>
//   </van-nav-bar>
// </template>
// <script>
// import router from "../router";
// export default {
//   props: {
//     title: String,
//     back: Boolean,
//   },
//   methods: {
//     onClickLeft() {
//       router.back();
//     },
//   },
// };
// </script>
// <style scoped>
// .nav-bar {
//   display: flex;
//   justify-content: space-between;
//   font-size: 0.5rem;
//   height: 1rem;
//   line-height: 1rem;
// }
// </style>
