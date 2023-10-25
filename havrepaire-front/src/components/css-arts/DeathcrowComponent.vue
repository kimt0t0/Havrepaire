<script setup lang="ts"></script>

<template>
    <div class="frame">
        <!-- CROW -->
        <!-- Head -->
        <div class="c-head"></div>
        <div class="c-eye-left"></div>
        <div class="c-eye-right"></div>
        <div class="c-beak"></div>
        <div class="c-beak-hider cbh-01"></div>
        <div class="c-beak-hider cbh-02"></div>
        <!-- Neck -->
        <div class="c-neck cn-left"></div>
        <div class="c-neck cn-right"></div>
        <!-- Body -->
        <div class="c-body"></div>
        <!-- Arms -->
        <div class="c-arm ca-left"></div>
        <div class="c-arm ca-right"></div>
        <!-- Hand -->
        <div class="c-hand"></div>
        <!-- Legs -->
        <div class="c-leg cl-left"></div>
        <div class="c-leg cl-right"></div>
        <!-- Feet -->
        <div class="c-foot-talon cft-01"></div>
        <div class="c-foot-talon cft-02"></div>
        <div class="c-foot-talon cft-03"></div>
        <div class="c-foot-talon cft-04"></div>
        <div class="c-foot-talon cft-05"></div>

        <!-- SWORD -->
        <div class="s-pommel"></div>
        <div class="s-handle-bottom"></div>

        <div class="s-handle-top"></div>
        <div class="s-handle-circle shc-left">
            <div class="s-handle-magic"></div>
        </div>
        <div class="s-handle-circle shc-right">
            <div class="s-handle-magic"></div>
        </div>

        <div class="s-handle-triangle sht-left"></div>
        <div class="s-handle-triangle sht-right"></div>

        <div class="s-blade">
            <div class="s-blade-magic sbm-basis"></div>
        </div>
        <div class="s-blade-top">
            <div class="s-blade-magic sbm-basis-top"></div>
        </div>

        <div class="s-blade-magic sbm-detail-01"></div>
        <div class="s-blade-magic sbm-detail-02"></div>
        <div class="s-blade-magic sbm-detail-03"></div>
    </div>
</template>

<style lang="scss" scoped>
/* ***** GENERAL ***** */

/* *** VARIABLES *** */
$white: #FFFFFF;
$black: #000000;
$grey-01: #020820;
$grey-02: #363D4F;
$grey-03: #90949F;
$pink-01: #FFC9C3;
$pink-02: #F16466;
$brown-01: #656064;
$brown-02: #4F4447;

/* *** MIXINS *** */
@mixin center {
    display: flex;
    justify-content: center;
    align-items: center;
}

@mixin item {
    position: absolute;
    box-sizing: border-box;
}

@mixin bended {
    transform: rotate(7deg);
}

@mixin eye {
    @include item;
    z-index: 3;
    position: absolute;
    box-sizing: border-box;
    background-color: $white;
    width: 1.5rem;
    height: 1.65rem;
    border-radius: 50%;
}


/* *** BODY *** */
.body {
    box-sizing: border-box;
    width: 100vw;
    height: 100vh;
    background-color: $black;
    display: flex;
    justify-content: center;
    align-items: center;
}

/* *** FRAME *** */
.frame {
    box-sizing: border-box;
    position: relative;
    width: 20rem;
    height: 20rem;
    background-color: $white;
    border-radius: 2rem;
    box-shadow: 0 0 0.5rem 1rem $white;
}

/* ***** CROW ***** */

/* *** HEAD *** */
.c-head {
    @include item;
    @include bended;
    z-index: 2;
    width: 6rem;
    height: 6.5rem;
    background-color: $grey-01;
    box-shadow: 0 0.25rem 0.25rem rgba(255, 255, 255, 0.8) inset;
    border-radius: 1.5rem 1.75rem 0 0;
    top: 2rem;
    left: 7rem;
}

.c-eye-left {
    @include eye;
    transform: rotate(12deg);
    top: 2.5rem;
    left: 7.5rem;
}

.c-eye-right {
    @include eye;
    transform: rotate(-11deg);
    top: 3rem;
    right: 7.25rem;
}

.c-beak {
    @include item;
    @include bended;
    z-index: 3;
    width: 3rem;
    height: 1.25rem;
    background: linear-gradient(-90deg, #3B1731, #818794);
    clip-path: polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%);
    top: 4.5rem;
    left: 8.35rem;
}

.c-beak-hider {
    @include item;
    z-index: 4;
    background-color: $grey-01;
    width: 2rem;
    height: 1.5rem;
    border-radius: 50%;
}

.cbh-01 {
    transform: rotate(20deg);
    top: 5rem;
    left: 7.65rem;
}

.cbh-02 {
    transform: rotate(-20deg);
    top: 5.25rem;
    left: 9.5rem;
}

/* *** NECK *** */

.c-neck {
    @include item;
    @include bended;
    z-index: 3;
    background-color: $grey-03;
    width: 2.5rem;
    height: 3.25rem;
    border-radius: 1rem;
}

.cn-left {
    clip-path: polygon(0 0, 0% 100%, 100% 50%);
    box-shadow: -0.75rem 0 0.15rem $grey-02 inset;
    top: 5.5rem;
    left: 6.5rem;
}

.cn-right {
    clip-path: polygon(100% 0, 0 50%, 100% 100%);
    box-shadow: 2rem 0 0.75rem darken($grey-02, 12%) inset;
    top: 6rem;
    right: 7rem;
}

/* *** BODY *** */
.c-body {
    @include item;
    z-index: 1;
    background-color: $grey-01;
    width: 8rem;
    height: 10rem;
    border-radius: 2.5rem 3rem 5rem 5rem;
    transform: rotate(2deg);
    top: 7rem;
    left: 5.5rem;
}

/* *** ARMS *** */
.c-arm {
    @include item;
    z-index: 2;
    width: 2rem;
    height: 6rem;
    background-color: $grey-01;
}

.ca-left {
    border-radius: 5rem 0 6rem 0.5rem;
    transform: rotate(42deg);
    top: 6.75rem;
    left: 4.5rem;
}

.ca-right {
    border-radius: 0 5rem 0.5rem 6rem;
    transform: rotate(-106deg);
    height: 6.5rem;
    top: 4.75rem;
    right: 5.5rem;
}

/* HAND */
.c-hand {
    @include item;
    z-index: 4;
    width: 2rem;
    height: 1.5rem;
    background-color: $grey-01;
    border-radius: 1rem 1rem 3rem 1rem;
    transform: rotate(88deg);
    top: 6.75rem;
    right: 3rem;
}

/* *** LEGS *** */
.c-leg {
    @include item;
    z-index: 2;
    width: 0.4rem;
    height: 2rem;
    background-color: $grey-01;
}

.cl-left {
    @include bended;
    top: 16rem;
    left: 7rem;
}

.cl-right {
    width: 0.35rem;
    transform: rotate(-2deg);
    top: 15.25rem;
    right: 8rem;
}

/* *** FEET *** */
.c-foot-talon {
    @include item;
    z-index: 2;
    width: 0.25rem;
    height: 0.5rem;
    background-color: $grey-01;
    border-radius: 3rem 0 0 5rem;
}

.cft-01 {
    bottom: 1.6em;
    left: 6.7rem;
    transform: rotate(25deg);
}

.cft-02 {
    bottom: 1.55em;
    left: 6.9rem;
    transform: rotate(25deg);
}

.cft-03 {
    bottom: 1.6em;
    left: 7.1rem;
    transform: rotate(-25deg);
    border-radius: 0 3rem 5rem 0;
}

.cft-04 {
    bottom: 2.5em;
    right: 8.25rem;
    transform: rotate(12deg);
}

.cft-05 {
    bottom: 2.45em;
    right: 7.85rem;
    transform: rotate(4deg);
}

/* ***** SWORD ***** */

.s-pommel {
    @include item;
    z-index: 3;
    width: 1.5rem;
    height: 1.5rem;
    background-color: $brown-01;
    clip-path: polygon(50% 0%, 100% 35%, 50% 100%, 0 35%);
    box-shadow: 0.75rem 0.5rem 0.25rem darken($brown-02, 10%) inset;
    top: 8.25rem;
    right: 3.5rem;
    transform: rotate(2deg);
}

.s-handle-bottom {
    @include item;
    z-index: 3;
    width: 1rem;
    height: 2.5rem;
    clip-path: polygon(0 0, 100% 0, 80% 100%, 20% 100%);
    background-color: $brown-01;
    box-shadow: 0.5rem 0 0.25rem darken($brown-02, 10%) inset;
    top: 6.25rem;
    right: 3.7rem;
    transform: rotate(2deg);
}

.s-handle-top {
    @include item;
    z-index: 4;
    width: 3rem;
    height: 0.7rem;
    background-color: $brown-01;
    box-shadow: 0 -0.15rem 0.15rem darken($brown-02, 10%) inset;
    transform: rotate(2deg);
    top: 5.8rem;
    right: 2.65rem;
}

.s-handle-circle {
    @include item;
    z-index: 4;
    width: 1rem;
    height: 1rem;
    border-radius: 100%;
    background-color: $brown-01;
    transform: rotate(2deg);
    display: flex;
    justify-content: center;
    align-items: center;
}

.shc-left {
    box-shadow: 0.08rem -0.15rem 0.15rem darken($brown-02, 10%) inset;
    top: 5.5rem;
    right: 5rem;
}

.shc-right {
    box-shadow: -0.08rem -0.15rem 0.15rem darken($brown-02, 10%) inset;
    top: 5.65rem;
    right: 2rem;
}

.s-handle-magic {
    @include item;
    z-index: 5;
    width: 0.4rem;
    height: 0.4rem;
    border-radius: 100%;
    background: radial-gradient($white, $pink-01);
}

.s-handle-triangle {
    @include item;
    z-index: 3;
    width: 1rem;
    height: 1rem;
    background-color: darken($brown-02, 10%);
    clip-path: polygon(100% 0, 0 0, 50% 100%);
    transform: rotate(2deg);
}

.sht-left {
    top: 6.05rem;
    right: 5rem;
}

.sht-right {
    top: 6.15rem;
    right: 2rem;
}

.s-blade {
    @include item;
    @include center;
    z-index: 3;
    width: 2rem;
    height: 4.5rem;
    background-color: lighten($brown-01, 6%);
    border-radius: 0.25rem 0.25rem 0 0;
    transform: rotate(2deg);
    top: 1.4rem;
    right: 3rem;
}

.s-blade-magic {
    @include item;
    width: 0.5rem;
    height: 4.5rem;
    background: linear-gradient(0.25turn, $pink-02, $pink-01, $pink-02);
}

.s-blade-top {
    @include item;
    @include center;
    z-index: 3;
    width: 2rem;
    height: 1.5rem;
    clip-path: polygon(50% 0, 0 100%, 100% 100%);
    background-color: lighten($brown-01, 6%);
    transform: rotate(2deg);
    top: 0;
    right: 2.9rem;
}

.sbm-basis-top {
    width: 2rem;
    height: 1.5rem;
}

.sbm-detail-01 {
    z-index: 4;
    width: 1.8rem;
    height: 0.75rem;
    transform: rotate(2deg);
    clip-path: polygon(100% 0, 0 0, 50% 100%);
    top: 1.45rem;
    right: 3rem;
}

.sbm-detail-02 {
    z-index: 4;
    width: 1.5rem;
    height: 0.8rem;
    transform: rotate(2deg);
    clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);
    top: 2rem;
    right: 3.2rem;
}

.sbm-detail-03 {
    z-index: 4;
    width: 1.15rem;
    height: 0.8rem;
    transform: rotate(2deg);
    clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);
    top: 2.6rem;
    right: 3.4rem;
}
</style>