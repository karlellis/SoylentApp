import { useState } from 'react';
import { ImgElement } from '../methods/simpleComp';

export const Item = ({ showItemsBtn, pos, id, title, link, descr, icon, video,
    hidden, cat, itemEditDel, itemVideo, itemHide }) => {
    const [isActive, setIsActive] = useState(false);
    const hide = hidden ? <ImgElement type={"iRedPoint"} /> : ""
    const linkOrVideo = video
        ?
        (<img className="items pointer" title={title} alt={title} src={icon}
            onClick={() => itemVideo(id, cat)} />)
        :
        (< a title={title} href={link} target="_blank" rel="noreferrer">
            <img className="items" title={title}
                alt={title} src={icon} />
        </a>);

    let itemBtn = "";
    let descrTxt = "";
    let titleTxt = "";

    if (descr !== "") {
        descrTxt = (
            <div className={`${isActive ? 'descr-shown row medfonts lato text-center m-auto' : 'descr-hidden'}`}
                style={{
                    backgroundImage: "url(" + icon + ")",
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat'
                }}>
                <p style={{ backgroundColor: "rgba(0, 0, 0, 0.7)", margin: ".5rem", flexShrink: "inherit" }}>{descr}</p>
            </div>
        )
        titleTxt = (
            <h4>
                <div className="row lato text-center m-1">
                    <div className="col">
                        <div className="row">
                            <div className="col d-flex flex-column justify-content-center align-items-center">
                                <b>{title}</b>
                            </div>
                            {hide}
                            <div className="col-2 borderleft pointer d-flex flex-column justify-content-center align-items-center"
                                onClick={() => setIsActive(!isActive)}>
                                <b>{isActive ? '-' : '+'}</b>
                            </div>
                        </div>
                    </div>
                </div>
            </h4>
        )
    } else {
        descrTxt = "";
        titleTxt = (
            <h4>
                <div className="row lato text-center m-1">
                    <div className="col">
                        <div className="row">
                            <div className="col d-flex flex-column justify-content-center align-items-center">
                                <b>{title}</b>
                            </div>
                            {hide}
                        </div>
                    </div>
                </div>
            </h4>
        );
    };
    if (showItemsBtn === "ShowItemBtn") {
        itemBtn = (
            <div className="itemcontainer">
                <div className="iconcontainer box box2">
                    {!isActive && linkOrVideo}
                    {descrTxt}
                </div>
                {titleTxt}
                <div className="row btncontainer">
                    <button className="col itembutton solidgreen m-1" onClick={() => itemEditDel("itemEdit", id, pos)}>
                        Edit
                    </button>
                    <button className="col-1 itembutton black m-1 pad01">
                        {pos + 1}
                    </button>
                    <button className="col itembutton solidbrick m-1" onClick={() => itemEditDel("itemDel", id, pos)}>
                        Remove
                    </button>
                </div>
            </div>
        )
    } else {
        itemBtn = (
            <div className="itemcontainer">
                <div className="iconcontainer box box2">
                    {!isActive && linkOrVideo}
                    {descrTxt}
                </div>
                {titleTxt}
            </div>
        )
    }
    // }
    return (
        <>
            {(!itemHide || showItemsBtn === "ShowItemBtn") && itemBtn}
        </>
    );
}

export const Cat = ({ showItemsBtn, pos, title, icon, hidden, catCont, catEditDel, itemHide }) => {
    const hide = hidden ? <ImgElement type={"iRedPoint"} /> : ""
    let catBtn = ""
    if (showItemsBtn === "ShowItemBtn") {
        catBtn = (
            <div className="itemcontainer">
                <div className="iconcontainer box box2">
                    <img className="items pointer" title={title} alt={title} src={icon}
                        onClick={catCont} />
                    {/* onClick={() => catCont(pos)} /> */}
                </div>
                <h4>
                    <div className="row lato text-center m-1">
                        <div className="col">
                            <div className="row">
                                <div className="col d-flex flex-column justify-content-center align-items-center">
                                    <b>{title}</b>
                                </div>
                                {hide}
                            </div>
                        </div>
                    </div>
                </h4>
                <div className="row btncontainer">
                    <button className="col itembutton solidgreen m-1" onClick={() => catEditDel("CatEdit", pos)}>
                        Edit
                    </button>
                    <button className="col-1 itembutton black m-1 pad01">
                        {pos + 1}
                    </button>
                    <button className="col itembutton solidbrick m-1" onClick={() => catEditDel("CatDel", pos)}>
                        Remove
                    </button>
                </div>

            </div>
        )
    } else {
        catBtn = (
            <div className="itemcontainer">
                <div className="iconcontainer box box2">
                    <img className="items pointer" title={title} alt={title} src={icon}
                        onClick={catCont} />
                </div>
                <h4>
                    <div className="row lato text-center m-1">
                        <div className="col">
                            <div className="row">
                                <div className="col d-flex flex-column justify-content-center align-items-center">
                                    <b>{title}</b>
                                </div>
                                {hide}
                            </div>
                        </div>
                    </div>
                </h4>
            </div>
        )
    }
    return (
        <>
            {(!itemHide || showItemsBtn === "ShowItemBtn") && catBtn}
        </>
    );

}

export const Credit = ({ showItemsBtn, pos, title, link, descr, crsEditDel }) => {
    let creditBtn = ""
    if (showItemsBtn === "ShowItemBtn") {
        creditBtn = (
            <>
                <div className="row">
                    <button className="col extcredits green m-1"
                        onClick={() => {
                            window.open(link);
                        }}>
                        <h2><font color="white">
                            {title}
                        </font></h2>
                        <h5><font color="Chartreuse">{descr}</font></h5>
                    </button>
                </div>
                <div className="row btncontainer">
                    <button className="col itembutton solidgreen m-1" onClick={() => crsEditDel("CrsEdit", pos)}>
                        Edit
                    </button>
                    <button className="col-1 itembutton black m-1 pad01">
                        {pos + 1}
                    </button>
                    <button className="col itembutton solidbrick m-1" onClick={() => crsEditDel("CrsDel", pos)}>
                        Remove
                    </button>
                </div>
            </>
        )
    } else {
        creditBtn = (
            <div className="row">
                <button className="col extcredits green m-1"
                    onClick={() => {
                        window.open(link);
                    }}>
                    <h2><font color="white">
                        {title}
                    </font></h2>
                    <h5><font color="Chartreuse">{descr}</font></h5>
                </button>
            </div>
        )
    }
    return (
        <>
            {creditBtn}
        </>
    );
}

export const Element = ({ eleShow, children, mainBtn, id, sfondo, colore, z, colW }) => {
    const showHideClassName = eleShow ? "d-block" : "d-none";
    const justifyCenterEnd = mainBtn ? "justify-content-end" : "justify-content-center";
    return (
        <section id={id} style={{ backgroundColor: sfondo, color: colore, zIndex: z }}
            className={showHideClassName + " " + justifyCenterEnd + " " + colW + " latoplain d-flex flex-column align-items-center"}>
            {children}
        </section>
    );
};

export const EditElement = ({ editEleShow, children, hidden }) => {
    const showHideClassName = editEleShow ? "d-block" : "d-none";
    const hide = hidden ? "" : <ImgElement type={"redPoint"} />
    return (
        <div className={showHideClassName + " stretch d-flex justify-content-center align-items-center"}>
            {children} {hide}
        </div>
    );
};

export const EleDialog = ({ handleSave, handleMidBtn, handleClose, eleDiaShow, children, saveLabel, midBtnLabel,
    activityChanged, hideApply, hideClose, hideMidBtn, footTheme, mainTheme }) => {
    const showHideClassName = eleDiaShow ? "modal display-block" : "modal display-none";
    const showHideApply = hideApply ? "display-none" : "display-block";
    const showHideMidBtn = hideMidBtn ? "display-none" : "display-block";
    const showHideClose = hideClose ? "display-none" : "display-block";
    return (
        <div className={showHideClassName}>
            <section className={mainTheme}>
                {children}
                <div className={footTheme}>
                    <button type="button" disabled={(activityChanged) ? true : false} className={showHideApply + " btn btn-primary"} onClick={handleSave}>{saveLabel}</button>
                    <button type="button" className={showHideMidBtn + " btn btn-success"} onClick={handleMidBtn}>{midBtnLabel}</button>
                    <button type="button" className={showHideClose + " btn btn-secondary"} data-dismiss="modal" onClick={handleClose}>Close</button>
                </div>
            </section>
        </div>
    );
};
