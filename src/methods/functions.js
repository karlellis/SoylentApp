import { nome, credentials } from '../';
import { useState, useEffect } from 'react';

export async function fetchUpPHP(file, url, key) {
    var data = new FormData()
    data.append(key, file)
    await fetch(url, {
        method: 'POST',
        headers: {
            'Accept': '*/*'
        },
        body: data
    }).then((response) => response.json())
        .then((json) => {
            nome = json.filename;
        });
}

export async function fetchUpConfig(file, url, key) {
    var data = new FormData()
    data.append(key, JSON.stringify(file))
    await fetch(url, {
        method: 'POST',
        headers: {
            'Accept': '*/*'
        },
        body: data
    }).then((response) => response.json())
        .then((json) => {
        });
}

export async function fetchDelPHP(itemIcon, url, key) {
    var data = new FormData()
    data.append(key, itemIcon)
    await fetch(url, {
        method: 'POST',
        headers: {
            'Accept': '*/*'
        },
        body: data
    }).then((response) => response.json())
        .then((json) => {
        });
}

export async function fetchDownCredentials(url) {
    await fetch(url, {
        method: 'GET',
        headers: {
            'Accept': '*/*'
        },
    }).then((response) => response.json())
        .then((json) => {
            credentials = json;
            // console.log("User: " + credentials.user);
            // console.log("Password: " + credentials.password);
        });
}

export async function hashUsrPsw(plaintextUser, plaintextPass, bcrypt) {
    const hashUsr = await bcrypt.hash(plaintextUser, 10);
    const hashPsw = await bcrypt.hash(plaintextPass, 10);
    return [hashUsr, hashPsw];
}

export async function comparePassword(plaintextPassword, hash, bcrypt) {
    const result = await bcrypt.compare(plaintextPassword, hash);
    return result;
}

export function Orologio() {
    const [dateState, setDateState] = useState(new Date());
    useEffect(() => {
        setInterval(() => setDateState(new Date()), 1000);
    }, []);
    return (
        <div className="Orologio">
            {/* <ClockIcon /> */}
            <p className="medfont">
                {dateState.toLocaleString('it-IT', {
                    hour: 'numeric',
                    minute: 'numeric',
                    second: 'numeric',
                    hour12: false,
                })}
            </p>
            {/* <CalenderIcon /> */}
            <p className="smallfont">
                {' '}
                {dateState.toLocaleDateString('it-IT', {
                    weekday: 'short',
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                })}
            </p>
        </div>
    );
}

export function FormChanges(form) {

    // get form
    if (typeof form == "string") form = document.getElementById(form);
    if (!form || !form.nodeName || form.nodeName.toLowerCase() != "form") return null;

    // find changed elements
    var changed = [], n, c, def, o, ol, opt;
    for (var e = 0, el = form.elements.length; e < el; e++) {
        n = form.elements[e];
        c = false;

        switch (n.nodeName.toLowerCase()) {

            // select boxes
            case "select":
                def = 0;
                for (o = 0, ol = n.options.length; o < ol; o++) {
                    opt = n.options[o];
                    c = c || (opt.selected != opt.defaultSelected);
                    if (opt.defaultSelected) def = o;
                }
                if (c && !n.multiple) c = (def != n.selectedIndex);
                break;

            // input / textarea
            case "textarea":
            case "input":

                switch (n.type.toLowerCase()) {
                    case "checkbox":
                        // checkbox / radio
                        c = (n.checked != n.defaultChecked);
                        break;
                    case "radio":
                        // standard values
                        c = (n.value != n.defaultValue);
                        break;
                    default:
                        // standard values
                        c = (n.value != n.defaultValue);
                        break;
                }
                break;
        }

        if (c) changed.push(n);
    }
    console.log("Changed: ", changed);
    let modified;
    if (changed.length === 0) {
        modified = false;
    } else {
        modified = true;
    }
    return modified;

}