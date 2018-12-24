// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';
var tick, ticktimer, start, stop, reset, startbtn, stopbtn, resetbtn, Q, time, isTicking, ns;

Q = q=>document.querySelector(q);

startbtn = Q("#start");
stopbtn = Q("#stop");
resetbtn = Q("#reset");
ns = false;

function tick() {
    time++;
    document.querySelector("#timeleft").innerHTML = Math.floor(time / 60) + ":" + (("" + (time % 60)).length == 1 ? "0" + (time % 60) : "" + (time % 60));
}
function start() {
    if (!ns) {
        localStorage.setItem("wasticking", true);
        localStorage.setItem("savedDate", new Date())
    }
    isTicking = true;
    window.ticktimer = setInterval(tick, 1000);
    setTimeout(function() {
        startbtn.style.display = "none";
        stopbtn.style.display = "block";
    }, 200)
}
function stop() {
    localStorage.setItem("wasticking", false);
    isTicking = false;
    reset();
    clearInterval(ticktimer);
    setTimeout(function() {
        startbtn.style.display = "block";
        stopbtn.style.display = "none";
    }, 200)
}
function reset() {
    var wt = isTicking;
    if (wt) {
        stop()
    }
    time = -1;
    tick();
    if (wt) {
        start();
    }
}

startbtn.onclick = start;
stopbtn.onclick = stop;
resetbtn.onclick = reset;
time = -1;
tick();
if (localStorage.getItem("wasticking") == "true") {
    if ((!!localStorage.getItem("savedDate"))) {
        time = Math.floor(Math.abs((new Date().getTime() - new Date(localStorage.getItem("savedDate")).getTime()) / 1000));
        tick();
        ns = true;
        start();
    }
}
