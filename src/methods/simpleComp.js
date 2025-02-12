import { spData, changeFlag } from '../';

export const ImgElement = ({ type }) => {
  let imma = "";
  switch (type) {
    case "overlay":
      imma = (
        <img className="overlay" alt="Overlay" src={spData.LogoIcon} />
      )
      break;
    case "redPoint":
      imma = (
        <img className="gear menux mt-2 mb-2" title="Hidden" alt="Hidden" src="./img/point.svg" />
      )
      break;
    case "iRedPoint":
      imma = (
        <div class="col-2 borderleft itemx d-flex flex-column justify-content-center align-items-center">
          <img className="itemx mt-2 mb-2" title="Hidden" alt="Hidden" src="./img/point.svg" />
        </div>
      );
      break;
    case "logo":
      imma = (
        <img className="logo mt-2 mb-2" title="Home" alt="Logo" src={spData.LogoIcon}
          onClick={() => window.location.href = spData.homeLink} />
      );
      break;
    default:
      imma = "";
      break;
  }
  return (
    <>
      {imma}
    </>
  )
}

export const ModalTitle = ({ title }) => {
  return (
    <div className="modal-header">
      <h5 className="modal-title" >{title}</h5>
    </div>
  )
}

export const InputFile = ({ fileIn }) => {
  const handleChange = (event) => {
    fileIn(event);
    // Assign your variable here
    changeFlag = true;
  };

  return (
    <div className="form-group">
      <div className="row text-center mb-1 m-auto">
        <div className="col">
          <div className="row border">
            <div className="col d-flex flex-column justify-content-center align-items-center">
              <input type="file" className="form-control boxs border-0" name="icon"
                onChange={handleChange} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export const InputPosition = ({ edit, pos, tempo, id }) => {
  const handleChange = (event) => {
    tempo(event);
    // Assign your variable here
    changeFlag = true;
  };
  if (edit === "Add Item") {
    return (
      <div className="form-group">
        <div className="row text-center mb-1 m-auto">
          <div className="col">
            <div className="row border">
              <div className="col-2 latomenu d-flex flex-column justify-content-center align-items-center">
                <label>Pos</label>
              </div>
              <div className="col d-flex flex-column justify-content-center align-items-center">
                <input type="text" placeholder="Leave blank for last..." id={id} className="form-control border-0"
                  onChange={handleChange} />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  } else {
    return (
      <div className="form-group">
        <div className="row text-center mb-1 m-auto">
          <div className="col">
            <div className="row border">
              <div className="col-2 latomenu d-flex flex-column justify-content-center align-items-center">
                <label>Pos</label>
              </div>
              <div className="col d-flex flex-column justify-content-center align-items-center">
                <input type="text" className="form-control border-0" placeholder={pos + 1} id={id}
                  onChange={handleChange} />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export const InputTitle = ({ label, edit, tempTitle, id, tempo }) => {
  const handleChange = (event) => {
    tempo(event);
    // Assign your variable here
    changeFlag = true;
  };
  if (edit === "Add Item") {
    return (
      <div className="form-group">
        <div className="row text-center mb-1 m-auto">
          <div className="col">
            <div className="row border">
              <div className="col-2 latomenu d-flex flex-column justify-content-center align-items-center">
                <label>{label}</label>
              </div>
              <div className="col d-flex flex-column justify-content-center align-items-center">
                <input type="text" className="form-control border-0" id={id} onChange={handleChange} />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  } else {
    return (
      <div className="form-group">
        <div className="row text-center mb-1 m-auto">
          <div className="col">
            <div className="row border">
              <div className="col-2 latomenu d-flex flex-column justify-content-center align-items-center">
                <label>{label}</label>
              </div>
              <div className="col d-flex flex-column justify-content-center align-items-center">
                <input type="text" className="form-control border-0" defaultValue={tempTitle} id={id} onChange={handleChange} />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export const InputLink = ({ edit, tempLink, id, tempo }) => {
  const handleChange = (event) => {
    tempo(event);
    // Assign your variable here
    changeFlag = true;
  };
  if (edit === "Add Item") {
    return (
      <div className="form-group">
        <div className="row text-center mb-1 m-auto">
          <div className="col">
            <div className="row border">
              <div className="col-2 latomenu d-flex flex-column justify-content-center align-items-center">
                <label>Link</label>
              </div>
              <div className="col d-flex flex-column justify-content-center align-items-center">
                <input type="text" className="form-control border-0" id={id}
                  onChange={handleChange} />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  } else {
    return (
      <div className="form-group">
        <div className="row text-center mb-1 m-auto">
          <div className="col">
            <div className="row border">
              <div className="col-2 latomenu d-flex flex-column justify-content-center align-items-center">
                <label>Link</label>
              </div>
              <div className="col d-flex flex-column justify-content-center align-items-center">
                <input type="text" className="form-control border-0" defaultValue={tempLink}
                  onChange={handleChange} />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export const InputCat = ({ catMenuB }) => {
  // const handleChange = (event) => {
  //   catMenuB(event);
  //   // Assign your variable here
  //   changeFlag = true;
  // };
  return (
    <div className="form-group">
      <div className="row mb-1 m-auto">
        <div className="col">
          <div className="row border">
            <div className="col pt-1 pb-1 padlr latomenu d-flex flex-column justify-content-center align-items-center">
              <label>Category</label>
            </div>
            <div className="col d-flex flex-column justify-content-center align-items-center">
              {catMenuB}
              {/* {handleChange} */}
            </div>
          </div>
        </div>
        <div className="col-1"></div>
        <div className="col">
        </div>
      </div>
    </div>
  )
}

export const InputWidth = ({ idAuto, idCol1, idCol2, idCol3, idCol4, idCol5,
  valAuto, valCol1, valCol2, valCol3, valCol4, valCol5, tempoColW, tColW }) => {
  const handleChange = (event) => {
    tempoColW(event);
    // Assign your variable here
    changeFlag = true;
  };
  return (
    <div class="form-group" >
      <div className="row text-center mb-1 m-auto">
        <div className="col">
          <div className="row border">
            <div className="col-2 col pt-1 pb-1 latomenu d-flex flex-column justify-content-center align-items-center">
              <label>Width</label>
            </div>
            <div className="col pt-1 pb-1">
              <div className="row m-auto">
                <div className="col radio">
                  <label class="radio-inline"> <input type="radio" name="blockWidth" id={idAuto}
                    value={valAuto} onChange={handleChange} /* checked={tColW === valAuto} */
                    defaultChecked={tColW === valAuto} /> Auto </label>
                </div>
                <div className="col radio">
                  <label class="radio-inline"> <input type="radio" name="blockWidth" id={idCol1}
                    value={valCol1} onChange={handleChange} /* checked={tColW === valCol1} */
                    defaultChecked={tColW === valCol1} /> 1 </label>
                </div>
                <div className="col radio">
                  <label class="radio-inline"> <input type="radio" name="blockWidth" id={idCol2}
                    value={valCol2} onChange={handleChange} /* checked={tColW === valCol2} */
                    defaultChecked={tColW === valCol2} /> 2 </label>
                </div>
                <div className="col radio">
                  <label class="radio-inline"> <input type="radio" name="blockWidth" id={idCol3}
                    value={valCol3} onChange={handleChange} /* checked={tColW === valCol3} */
                    defaultChecked={tColW === valCol3} /> 3 </label>
                </div>
                <div className="col radio">
                  <label class="radio-inline"> <input type="radio" name="blockWidth" id={idCol4}
                    value={valCol4} onChange={handleChange} /* checked={tColW === valCol4} */
                    defaultChecked={tColW === valCol4} /> 4 </label>
                </div>
                <div className="col radio">
                  <label class="radio-inline"> <input type="radio" name="blockWidth" id={idCol5}
                    value={valCol5} onChange={handleChange} /* checked={tColW === valCol5} */
                    defaultChecked={tColW === valCol5} /> 5 </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export const InputBackColor = ({ backColor, rgbToHex, bcLabel, tempo }) => {
  const handleChange = (event) => {
    tempo(event);
    // Assign your variable here
    changeFlag = true;
  };
  return (
    <div className="col">
      <div className="row border">
        <div className="col pt-1 pb-1 latomenu d-flex flex-column justify-content-center align-items-center">
          <label>{bcLabel}</label>
        </div>
        <div className="col d-flex flex-column justify-content-center align-items-center">
          <input type="color" className="form-control border-0 p-0" defaultValue={rgbToHex(backColor)} onChange={handleChange} />
        </div>
      </div>
    </div>
  )
}

export const InputTextColor = ({ textColor, rgbToHex, tempo }) => {
  const handleChange = (event) => {
    tempo(event);
    // Assign your variable here
    changeFlag = true;
  };
  return (
    <div className="col">
      <div className="row border">
        <div className="col pt-1 pb-1 latomenu d-flex flex-column justify-content-center align-items-center">
          <label>Text color</label>
        </div>
        <div className="col d-flex flex-column justify-content-center align-items-center">
          <input type="color" className="form-control border-0 p-0" defaultValue={rgbToHex(textColor)} onChange={handleChange} />
        </div>
      </div>
    </div>
  )
}

export const InputOpacity = ({ opacity, id, tempo }) => {
  const handleChange = (event) => {
    tempo(event);
    // Assign your variable here
    changeFlag = true;
  };
  return (
    <div className="form-group">
      <div className="row mb-1 m-auto">
        <div className="col">
          <div className="row border">
            <div className="col pt-1 pb-1 p-0 latomenu d-flex flex-column justify-content-center align-items-center">
              <label>Opacity</label>
            </div>
            <div className="col d-flex flex-column justify-content-center align-items-center p-0">
              <div className="row" style={{ width: "100%" }}>
                <div className="col-1 d-flex flex-column justify-content-center align-items-center">
                  <img className="plusminus" title="0" alt="0" src="./itemicons/rangeZero.svg" />
                </div>
                <div className="col d-flex flex-column justify-content-center align-items-center">
                  <input type="range" class="form-range border-0 p-0" min="0" max="1" step="0.1" list="optickmarks"
                    defaultValue={opacity} id={id} onChange={handleChange} ></input>
                  <datalist id="optickmarks">
                    <option value={"0"}></option>
                    <option value={"0.25"}></option>
                    <option className="tick" value={"0.5"}></option>
                    <option value={"0.75"}></option>
                    <option value={"1"}></option>
                  </datalist>
                </div>
                <div className="col-1 d-flex flex-column justify-content-center align-items-center">
                  <img className="plusminus" title="1" alt="1" src="./itemicons/rangeOne.svg" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export const InputVideo = ({ tmpVideo, tempo }) => {
  const handleChange = (event) => {
    tempo(event);
    // Assign your variable here
    changeFlag = true;
  };
  return (
    <div className="form-group">
      <div className="row mb-1 m-auto">
        <div className="col">
          <div className="row border">
            <div className="col pt-1 pb-1 padlr latomenu d-flex flex-column justify-content-center
             align-items-center">
              <label>Video</label>
            </div>
            <div className="col d-flex flex-column justify-content-center align-items-center">
              <label class="switch">
                <input type="checkbox" className="form-control" defaultChecked={tmpVideo}
                  onClick={handleChange} />
                <span class="slider round" title="Video Player"></span>
              </label>
            </div>
          </div>
        </div>
        <div className="col-1"></div>
        <div className="col">
        </div>
      </div>
    </div>
  )
}

export const InputInfos = ({ label, disField, stateDisBlk, title, hideSwitch, tempo, id }) => {
  const handleChange = (event) => {
    tempo(event);
    // Assign your variable here
    changeFlag = true;
  };
  return (
    <div className="form-group">
      <div className="row text-center mb-1 m-auto">
        <div className="col">
          <div className="row border">
            <div className="col-2 latomenu d-flex flex-column justify-content-center align-items-center">
              <label>{label}</label>
            </div>
            <div className="col d-flex flex-column justify-content-center align-items-center">
              <input type="text" disabled={disField} className="form-control border-0"
                defaultValue={title} id={id} onChange={handleChange} />
            </div>
            <div className="col-2 border d-flex flex-column justify-content-center align-items-center">
              <label className="switch">
                <input type="checkbox" className="form-control" defaultChecked={hideSwitch}
                  onClick={stateDisBlk} />
                <span class="slider round" title="Hide"></span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export const InputHideBlocks = ({ hideSwitch, switchClick }) => {
  const handleChange = (event) => {
    switchClick(event);
    // Assign your variable here
    changeFlag = true;
  };
  return (
    <div className="form-group">
      <div className="row mb-1 m-auto">
        <div className="col">
          <div className="row border">
            <div className="col col pt-1 pb-1 padlr latomenu d-flex flex-column justify-content-center align-items-center">
              <label>Hide</label>
            </div>
            <div className="col d-flex flex-column justify-content-center align-items-center">
              <label class="switch">
                <input type="checkbox" className="form-control" defaultChecked={!hideSwitch}
                  onClick={handleChange} />
                <span class="slider round" title="Hide"></span>
              </label>
            </div>
          </div>
        </div>
        <div className="col-1"></div>
        <div className="col">
        </div>
      </div>
    </div>
  )
}

export const InputSwitch = ({ hSwitch, dSwitch, swLabel }) => {
  const handleChange = (event) => {
    dSwitch(event);
    // Assign your variable here
    changeFlag = true;
  };
  return (
    <div className="form-group">
      <div className="row mb-1 m-auto">
        <div className="col">
          <div className="row border">
            <div className="col col pt-1 pb-1 padlr latomenu d-flex flex-column justify-content-center align-items-center">
              <label>{swLabel}</label>
            </div>
            <div className="col d-flex flex-column justify-content-center align-items-center">
              <label class="switch">
                <input type="checkbox" className="form-control" defaultChecked={hSwitch}
                  onClick={handleChange} />
                <span class="slider round"></span>
              </label>
            </div>
          </div>
        </div>
        <div className="col-1"></div>
        <div className="col">
        </div>
      </div>
    </div>
  )
}

export const AddSym = ({ showItemsBtn, addItem, addLabel }) => {
  let plusBtn = "";
  if (showItemsBtn === "ShowItemBtn") {
    plusBtn = (
      <button className="col extcredits solidgreen m-1"
        onClick={addItem}>
        <img className="gear mt-2 mb-2" title={addLabel} alt={addLabel} src="./itemicons/plus.svg" />
      </button>
    )
  } else {
    plusBtn = "";
  }
  return (
    <>
      {plusBtn}
    </>
  );
}

export const Dropdown = ({ search, crsShow, drpIsOpen, oClickDrpIO }) => {
  const showHideSearch = spData.noMenuSearch ? "d-none" : "d-block";
  const showHideCredits = spData.noMenuCredits ? "d-none" : "d-block";
  const menuClass = `dropdown-menu${drpIsOpen ? " show d-flex flex-column justify-content-center align-items-center" : " disNone"}`;
  return (
    <div className="dropdown"
      onClick={oClickDrpIO}>
      <button
        className="button indaco m-1 dropdown-toggle"
        id="menuButton"
        type="button"
        data-toggle="dropdown"
        aria-haspopup="true"
      >
        Menu
      </button>
      <div className={menuClass + " menuBG"} >
        <button className={showHideSearch + " col menuItem green m-1"}
          onClick={search}>
          {spData.menuSearchLabel}
        </button>
        <button className={showHideCredits + " col menuItem blue m-1"}
          onClick={crsShow}>
          {spData.menuCreditsLabel}
        </button>
      </div>
    </div>
  );
}

export const DropdownCat = ({ items, id, catName, setCat, drpIsOpen, oClickDrpIO }) => {
  const menuClass = `dropdown-menu${drpIsOpen ? " show d-flex flex-column justify-content-start align-items-center" :
    " disNone"}`;
  return (
    <div className="dropdown"
      onClick={oClickDrpIO}>
      <button
        className="button indaco m-1 dropdown-toggle"
        id={id}
        type="button"
        data-toggle="dropdown"
        aria-haspopup="true"
      >
        {catName}
      </button>
      <div className={menuClass + " menuBG"}>
        <button className="col menuItem green m-1"
          onClick={(e) => {
            setCat("Root", e);
          }}>
          Root
        </button>
        {
          items.map(({ id, title, icon }, i) => {
            return (
              <button className="col menuItem green m-1"
                onClick={(e) => {
                  setCat(title, e);
                }}>
                {title}
              </button>
            )
          })
        }
      </div>
    </div>
  );
}

export const LoginGear = ({ handleShowButtons }) => {
  return (
    <img className="gear mt-2 mb-2" alt="Login" src="./img/gears.svg"
      onClick={() => handleShowButtons(true)} />
  );
}

export const SettingsGear = ({ showItemsBtn }) => {
  const whiteOrCol = showItemsBtn ? "./img/colGear.svg" : "./img/gear.svg"
  return (
    <img className="gear mt-2 mb-2" alt="Settings" title="Settings" src={whiteOrCol} />
  );
}

export const Alert = ({ alertShow, alertMsg, alertCol, children }) => {
  return (
    <div className={`mb-2 ${alertShow ? 'alert-shown' : 'alert-hidden'}`} >
      <div className="row text-center pt-2">
        <div className="col">
          <div className="row">
            <section className={"col pt-2 contenitore " + alertCol + " latowhite d-flex justify-content-center align-items-center "}>
              <div>
                <p className="norfont">{alertMsg}</p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};