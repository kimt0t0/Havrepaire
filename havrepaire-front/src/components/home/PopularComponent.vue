<script setup lang="ts">
const articles = [
    {
        id: 1,
        illus: 'https://i.pinimg.com/originals/72/e1/be/72e1be8b2b0af7d7ec122cdfe9162341.jpg',
        title: 'Texte 1',
        text: 'Je suis le texte n°1.'
    },
    {
        id: 2,
        illus: 'https://cdn.thedesigninspiration.com/wp-content/uploads/2010/12/Dream-l.jpg',
        title: 'Texte 2',
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
    },
    {
        id: 3,
        illus: 'https://3.bp.blogspot.com/-mYXkrhKQrNw/WMbF2Fa3l9I/AAAAAAAAB8o/UUckx_TLwI8In3yEcSV-OS4CS90m5jdEwCPcB/s1600/Kyoto%2BJapan%2BJapanese%2Bautumn%2Bcolours.JPG',
        title: 'Texte 3 avec un titre plus long hahah',
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
    },
];

const getSize = (index: number) => {
    if (index >= 1) {
        return 'small'
    }
    return 'large'
};

const getColor = (index: number) => {
    if (index >= 1) {
        return 'primary'
    }
    return 'success'
};
</script>

<template>
    <div class="popular-container">
        <div class="classic-container contents-container">
            <!-- Title -->
            <HeroTitleParticle normalText="Textes populaires" textColor="success" />
            <div class="cards-container">
                <CardParticle v-for="(article, index) of articles" :key="index" :title="article.title"
                    :subtext="article.text" :illustration="article.illus" :size="getSize(index)" :color="getColor(index)"
                    :articleId="article.id" />
            </div>
        </div>

    </div>
</template>

<style lang="scss">
@use '@/styles/theme.scss' as *;

.popular-container {
    background-color: color($primary, 15);
    padding: $space-l 0 $space-xl;
    position: relative;

    /* animated bubble */
    &:hover {
        &::after {
            content: "";
            width: 50px;
            height: 50px;
            border-radius: $radius-circle;
            position: absolute;
            top: -$space-m;
            right: 40%;
            animation: riseBubble 1800ms linear 1;
        }
    }

    .contents-container {
        padding: 0 $space-m;
    }
}

.cards-container {
    width: 810px;
    max-width: 810px;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;

    @media (max-width: 840px) {
        width: 100%;
        max-width: 100%;
    }
}

/* bubble's animation */
@keyframes riseBubble {
    5% {
        background-color: color($primary, 45);
    }

    15% {
        top: -$space-l;
        right: 35%;
    }

    30% {
        top: -$space-xl;
        right: 37%;
    }

    50% {
        top: -space-xxl;
        right: 32%;
        width: 42px;
        height: 42px;
        background-color: color($primary, 54);
    }

    70% {
        top: -$space-xxxl;
        right: 28%;
        width: 34px;
        height: 34px;
        background-color: color($primary, 62);
    }

    80% {
        top: -204px;
        right: 25%;
        width: 36px;
        height: 36px;
        background-color: color($primary, 66);
    }

    90% {
        top: -316px;
        right: 21%;
        width: 24px;
        height: 24px;
        background-color: color($primary, 68);
    }

    100% {
        top: -380px;
        right: 18%;
        width: 18px;
        height: 18px;
        background-color: transparent;
    }

}
</style>