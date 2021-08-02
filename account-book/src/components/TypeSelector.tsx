import React, { useState } from "react";
import "./TypeSelector.scss";
import AddIcon from '@material-ui/icons/Add';
import Icon from "@material-ui/core/Icon";
import { History } from "history";
interface ITypeSelector {
  types: Array<any>;
  history: History;
  onSelectTypeClick: (item: any) => void;
  onDeleteTypeClick: (id: string) => void;
}
const TypeSelector = (props: ITypeSelector) => {
  const [editMode, setEditMode] = useState(false);
  const [selectedType, setSelectedType] = useState({icon: ""});
  const onEditClick = () => {
    setEditMode(!editMode)
  }

  const onTypeAddClick = () => {
    props.history.push("/add-type");
  }

  const onTypeSelectOrDeleteClick = (item: any) => {
    if (editMode) {
      props.onDeleteTypeClick(item.id)
      return;
    }
    setSelectedType(item);
    props.onSelectTypeClick(item);
  }

  return (
    <section>
      <section className="type-edit-container">
        <a className="type-edit-btn" onClick={onEditClick}>edit</a>
      </section>
      <ul className="type-selector">
        {
          props.types.map((tItem: any) => {
            return (
              <li>
                <Icon
                  onClick={() => onTypeSelectOrDeleteClick(tItem)}
                  color={selectedType.icon === tItem.icon ? "secondary" : "default"}
                >{tItem.icon}</Icon>
                <a className="type-text">{tItem.text}</a>
              </li>
            )
          })
        }
        <li v-show="editMode" className="type-option" >
          <AddIcon onClick={onTypeAddClick}></AddIcon>
          <a className="type-text">新增</a>
        </li>
      </ul>
    </section>
  )
}

export default TypeSelector;
// <template>
//   <section>
//     <section class="type-edit-container">
//       <a class="type-edit-btn" @click="onEditClick">edit</a>
//     </section>
//     <ul class="type-selector">
//       <li v-for="tItem in types" :key="tItem.text" class="type-option">
//         <van-icon
//           size="20px" 
//           :name="tItem.icon" 
//           @click="onTypeSelectOrDeleteClick(tItem)" 
//           :color="selected.indexOf(tItem.text) > -1 ? `red` : undefined"
//           :badge="editMode && tItem.id !== undefined ? '-' : ''"
//           ></van-icon>
//         <a class="type-text">{{ tItem.text }}</a>
//       </li>
//       <li v-show="editMode" class="type-option" >
//         <van-icon size="20px" name="add-o" key="add" @click="onTypeAddClick()"></van-icon>
//         <a class="type-text">新增</a>
//       </li>
//     </ul>
//   </section>
// </template>
// <script>
// import router from "../router";
// import {types} from "../constants";
// export default {
//   model: {
//     prop: "selected",
//     event: "getValue"
//   },
//   props: {
//     selected: Array,
//     multi: Boolean
//   },
//   computed: {
//     types: function() {
//       return [...types, ...this.$store.state.types];
//     }
//   },
//   data() {
//     return {
//       editMode: false
//     }
//   },
//   methods: {
//     onTypeSelectOrDeleteClick(item) {
//       if (this.editMode) {
//         this.$store.dispatch("deleteTypes", item.id)
//         return;
//       }
//       const index = this.selected.indexOf(item.text);
//       if (!this.multi) {
//         this.$emit("getValue", [item.text]);
//         return;
//       }
//       if (index > -1) {
//         this.selected.splice(index, 1);
//       } else {
//         this.selected.push(item.text);
//       }
//       this.$emit("getValue", this.selected);
//     },
//     onTypeAddClick() {
//       router.push("/add-type");
//     },
//     onEditClick() {
//       this.editMode = !this.editMode;
//     }
//   },
// };
// </script>

// <style scoped>
// .type-edit-container {
//   display: flex;
//   justify-content: flex-end;
// }
// .type-edit-btn {
//   display: block;
//   height: 20px;
//   padding-top: 10px;
//   padding-right: 30px;
// }
// .type-selector {
//   display: flex;
//   padding: 16px;
//   flex-wrap: wrap;
// }
// .type-option {
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   width: 35px;
//   height: 35px;
//   padding: 10px;
// }
// .type-text {
//   font-size: 8px;
//   display: inline-block;
// }
// </style>
