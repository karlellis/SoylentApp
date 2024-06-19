import { bcrypt, nome, credentials } from '../';
import { fetchUpConfig } from './methods/functionUtils';

export function saveConf(file, url, key) {
  fetchUpConfig(file, url, key)
    .then(res => {
      console.log("Config Saved!");
      this.itemCatSel(tempCatTitle, spData.items);
      this.itemCatSel("Root", spData.items);
    });;
}

export function crsActions(url, op) {
  if (url === "crs" && op === "add") {
    CrsNewItem.title = temp2;
    CrsNewItem.link = temp3;
    CrsNewItem.descr = temp4;
    arrayAdd = this.addAfter(array, inPos, CrsNewItem);
    this.setState({ creditsItems: arrayAdd });
    spData.creditsItems = arrayAdd;
    document.getElementById('crsAddForm').reset();
  } else if (url === "crs" && op === "addlast") {
    CrsNewItem.title = temp2;
    CrsNewItem.link = temp3;
    CrsNewItem.descr = temp4;
    inPos = array.length;
    arrayAdd = this.addAfter(array, inPos, CrsNewItem);
    this.setState({ creditsItems: arrayAdd });
    spData.creditsItems = arrayAdd;
    document.getElementById('crsAddForm').reset();
  } else if (url === "crs" && op === "edit") {
    if (temp2 !== "") {
      array[currPos].title = temp2;
    }
    if (temp3 !== "") {
      array[currPos].link = temp3;
    }
    if (temp4 !== "") {
      array[currPos].descr = temp4;
    }
    if (cgPos !== "") {
      CrsNewItem.title = array[currPos].title;
      CrsNewItem.link = array[currPos].link;
      CrsNewItem.descr = array[currPos].descr;
      if (inPos > currPos) {
        arrayAdd = this.addAfter(array, inPos + 1, CrsNewItem);
        arrayAdd.splice(currPos, 1);
        this.setState({ creditsItems: arrayAdd });
        spData.creditsItems = arrayAdd;
      } else {
        arrayAdd = this.addAfter(array, inPos, CrsNewItem);
        arrayAdd.splice(currPos + 1, 1);
        this.setState({ creditsItems: arrayAdd });
        spData.creditsItems = arrayAdd;
      }
    }
  }
  arrayAdd = [];
  temp = "";
  temp2 = "";
  temp3 = "";
  temp4 = "";
  cgPos = "";
  inPos = "";
  CrsNewItem = {
    "title": "",
    "link": "",
    "descr": ""
  };
  saveConf(spData, "./api/img-upload.php", "config");
}