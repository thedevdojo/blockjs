<template>
    <video :poster="image" id="player" crossorigin playsinline controls>
        <template v-if="hd_1080_url">
            <source :src="hd_1080_url" type="video/mp4" size="1080">
        </template>

        <template v-if="hd_url">
            <source :src="hd_url" type="video/mp4" size="720">
        </template>

        <template v-if="sd_540_url">
            <source :src="sd_540_url" type="video/mp4" size="480">
        </template>

        <template v-if="sd_url">
            <source :src="sd_url" type="video/mp4" size="360">
        </template>
    </video>
</template>
<script src="./player.js"></script>