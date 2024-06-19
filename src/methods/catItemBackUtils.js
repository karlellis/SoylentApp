// catItemBackUtils.js
export function catItemActions(file, url, op) { 
    if (fileImg !== null) {
      fetchDelPHP(tempIcon, "./api/img-upload.php", url)
        .then(res => {
        });

    }
    if (fileCatImg !== null) {
      fetchDelPHP(tempCatIcon, "./api/img-upload.php", url)
        .then(res => {
        });

    }
    tempIcon = "";
    tempCatIcon = "";
    this.fireAlert("Loading data... Please wait.", "solidblue");
    this.setState({
      activityChanged: true
    })
    fetchUpPHP(file, "./api/img-upload.php", url)
      .then(res => {
        if (url === "logo" && op === "edit") {
          spData.LogoIcon = "./img/" + nome;
          this.fireAlert("Changes Made!", "solidgreen");
          this.setState({
            activityChanged: false
          });
        } else if (url === "icon" && op === "edit") {
          if (fileImg !== null) {
            array[temp].icon = "./itemicons/" + nome;
          }
          if (temp2 !== "") {
            array[temp].title = temp2;
          }
          if (temp3 !== "") {
            array[temp].link = temp3;
          }
          array[temp].video = temp4;
          tempItemVideo = temp4;
          array[temp].cat = temp5;
          array[temp].descr = temp6;
          if (blockHide !== "none") {
            array[temp].hidden = blockHide;
            tempItemHide = blockHide;
          }
          if (inPos !== "") {
            let index = 0;
            if (tempCatTitle !== "Root") {
              index = this.state.catItems[inPos].id;
            } else {
              index = this.state.rootItems[inPos].id;
            }
            newItem.icon = array[temp].icon;
            newItem.title = array[temp].title;
            newItem.link = array[temp].link;
            newItem.descr = array[temp].descr;
            newItem.video = array[temp].video;
            newItem.cat = array[temp].cat;
            newItem.id = index;
            newItem.hidden = array[temp].hidden;
            var noAddArray = [];
            if (index > temp) {
              array = this.addAfter(array, index + 1, newItem);
              for (let i = (index + 1); i < array.length; i++) {
                (array[i].id)++;
              }
              tempIcon = "";
              array.splice(temp, 1);
              for (let i = (temp); i < array.length; i++) {
                (array[i].id)--;
              }
              noAddArray = [...array];
              this.setState({ items: array });
              spData.items = noAddArray;
              console.log("index > temp = ", (index));
              temp = newItem.id;
              currPos = index;
            } else {
              array = this.addAfter(array, index, newItem);
              for (let i = (index + 1); i < array.length; i++) {
                (array[i].id)++;
              }
              tempIcon = "";
              array.splice(temp + 1, 1);
              for (let i = (temp + 1); i < array.length; i++) {
                (array[i].id)--;
              }
              noAddArray = [...array];
              this.setState({ items: array });
              spData.items = noAddArray;
              console.log("Index = ", index);
              temp = newItem.id;
              currPos = index;
            }
            newItem = {
              "title": "",
              "link": "",
              "icon": "",
              "descr": "",
              "video": false,
              "cat": "",
              "id": 0,
              "hidden": false
            };
          }
          inPos = "";
          cgPos = "";
          temp2 = "";
          temp3 = "";
          temp4 = "";
          temp5 = tempCatTitle;
          temp6 = "";
          blockHide = "none";
          this.fireAlert("Changes Made!", "solidgreen");
        } else if (url === "icon" && op === "add") {
          newItem.icon = "./itemicons/" + nome;
          newItem.title = temp2;
          newItem.link = temp3;
          newItem.descr = temp6;
          newItem.video = temp4;
          newItem.cat = temp5;
          if (blockHide !== "none") {
            newItem.hidden = blockHide;
          } else {
            newItem.hidden = false;
          }
          let index = 0;
          console.log("Insert pos=", (inPos));
          if (arrayLength !== 0) {
            if (temp5 !== "Root") {
              console.log("tempCatTitle = Cat", inPos);
              index = this.state.catItems[inPos].id;
            } else {
              index = this.state.rootItems[inPos].id;
            }
          }
          newItem.id = index;

          console.log("Index iD=", (index));
          tempIcon = "";
          arrayAdd = this.addAfter(array, index, newItem);
          for (let i = (index + 1); i < arrayAdd.length; i++) {
            (arrayAdd[i].id)++;
          }
          this.setState({ items: arrayAdd });
          spData.items = arrayAdd;
          arrayAdd = [];
          arrayLength++;
          inPos = "";
          temp = "";
          temp2 = "";
          temp3 = "";
          temp4 = "";
          tempCatTitle = temp5;
          temp6 = "";
          blockHide = "none";
          newItem = {
            "title": "",
            "link": "",
            "icon": "",
            "descr": "",
            "video": false,
            "cat": "",
            "id": 0,
            "hidden": false
          };
          this.setState({ disFieldIA: true });
          document.getElementById('itemAddForm').reset();
          this.fireAlert("Item added!", "solidgreen");
        } else if (url === "icon" && op === "addlast") {
          newItem.icon = "./itemicons/" + nome;
          newItem.title = temp2;
          newItem.link = temp3;
          newItem.descr = temp6;
          newItem.video = temp4;
          newItem.cat = temp5;
          if (blockHide !== "none") {
            newItem.hidden = blockHide;
          } else {
            newItem.hidden = false;
          }
          newItem.id = arrayLength;
          inPos = arrayLength;
          tempIcon = "";
          arrayAdd = this.addAfter(array, inPos, newItem);
          this.setState({ items: arrayAdd });
          spData.items = arrayAdd;
          arrayAdd = [];
          arrayLength = arrayLength + 1;
          inPos = "";
          temp = "";
          temp2 = "";
          temp3 = "";
          temp4 = "";
          temp5 = tempCatTitle;
          temp6 = "";
          blockHide = "none";
          newItem = {
            "title": "",
            "link": "",
            "icon": "",
            "descr": "",
            "video": false,
            "cat": "",
            "id": 0,
            "hidden": false
          };
          this.setState({ disFieldIA: true });
          document.getElementById('itemAddForm').reset();
          this.fireAlert("Item added!", "solidgreen");
        } else if (url === "cat" && op === "edit") {
          if (fileImg !== null) {
            array[currPos].icon = "./itemicons/" + nome;
          }
          if (temp2 !== "") {
            array[currPos].title = temp2;
            this.state.items.forEach(element => {
              if (element.cat === tempCatTitle) {
                element.cat = temp2;
              }
            })
          }
          if (blockHide !== "none") {
            array[currPos].hidden = blockHide;
            tempItemHide = blockHide;
          }
          if (cgPos !== "") {
            catNewItem.icon = array[currPos].icon;
            catNewItem.title = array[currPos].title;
            catNewItem.hidden = array[currPos].hidden;
            if (inPos > currPos) {
              arrayAdd = this.addAfter(array, inPos + 1, catNewItem);
              tempIcon = "";
              arrayAdd.splice(currPos, 1);
              this.setState({ cats: arrayAdd });
              spData.cats = arrayAdd;
            } else {
              arrayAdd = this.addAfter(array, inPos, catNewItem);
              tempIcon = "";
              arrayAdd.splice(currPos + 1, 1);
              this.setState({ cats: arrayAdd });
              spData.cats = arrayAdd;
            }
          }
          arrayAdd = [];
          temp2 = "";
          inPos = "";
          cgPos = "";
          fileImg = null;
          blockHide = "none";
          catNewItem = {
            "title": "",
            "icon": "",
            "hidden": false
          };
          this.fireAlert("Changes Made!", "solidgreen");
        } else if (url === "cat" && op === "add") {
          catNewItem.icon = "./itemicons/" + nome;
          catNewItem.title = temp2;
          if (blockHide !== "none") {
            catNewItem.hidden = blockHide;
          } else {
            catNewItem.hidden = false;
          }
          tempIcon = "";
          arrayAdd = this.addAfter(array, inPos, catNewItem);
          this.setState({ cats: arrayAdd });
          spData.cats = arrayAdd;
          arrayAdd = [];
          temp2 = "";
          temp = "";
          blockHide = "none";
          catNewItem = {
            "title": "",
            "icon": "",
            "hidden": false
          };
          document.getElementById('catAddForm').reset();
          this.fireAlert("Cat added!", "solidgreen");
        } else if (url === "cat" && op === "addlast") {
          catNewItem.icon = "./itemicons/" + nome;
          catNewItem.title = temp2;
          if (blockHide !== "none") {
            catNewItem.hidden = blockHide;
          } else {
            catNewItem.hidden = false;
          }
          inPos = array.length;
          tempIcon = "";
          arrayAdd = this.addAfter(array, inPos, catNewItem);
          this.setState({ cats: arrayAdd });
          spData.cats = arrayAdd;
          arrayAdd = [];
          temp2 = "";
          inPos = "";
          blockHide = "none";
          catNewItem = {
            "title": "",
            "icon": "",
            "hidden": false
          };
          document.getElementById('catAddForm').reset();
          this.fireAlert("Cat added!", "solidgreen");
        } else if (url === "back" && op === "edit") {
          spData.backgroundImage = "./img/" + nome;
          spData.backgroundColor = hexToRgb(tempColor) + ", 1)";
          this.setState({
            backStyle: {
              backgroundImage: "url(" + spData.backgroundImage + ")",
              backgroundColor: spData.backgroundColor,
              backgroundPosition: 'center',
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
              backgroundAttachment: "fixed",
              position: "fixed",
              padding: "0",
              margin: "0",
              top: "0",
              left: "0",
              width: "100%",
              height: "100%",
              filter: "brightness(" + spData.backgroundOpacity.toString() + "%)",
              zIndex: "-1"
            }
          });
          this.fireAlert("Changes Made!", "solidgreen");
          this.setState({
            activityChanged: false
          });
        } else if (url === "backcat" && op === "edit") {
          spData.catImage = "./img/" + nome;
          spData.catColor = hexToRgb(tempCatColor) + ", 1)";
          this.setState({
            catStyle: {
              backgroundImage: "url(" + spData.catImage + ")",
              backgroundColor: spData.catColor,
              backgroundPosition: 'center',
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
              backgroundAttachment: "fixed",
              position: "fixed",
              padding: "0",
              margin: "0",
              top: "0",
              left: "0",
              width: "100%",
              height: "100%",
              opacity: spData.catOpacity.toString(),
              zIndex: "-1"
            }
          });
          this.fireAlert("Changes Made!", "solidgreen");
          this.setState({
            activityChanged: false
          });
        }
        saveConf(spData, "./api/img-upload.php", "config");
        fileCatImg = null;
        fileImg = null;
      });
  }