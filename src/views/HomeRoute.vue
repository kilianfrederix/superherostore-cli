<template>
    <header id="main-header">
        <h1>{{ titel }}</h1>
        <h5>{{ subtitel }}</h5>
        <transition name="winkelwagen">
            <p id="winkelwagen" v-if="showWinkelwagen">Items in <a href="/winkelwagen">winkelwagen</a>:
                {{ aantalInWinkelwagen }}
            </p>
        </transition>
        <div class="nav">
            <router-link to="/">Home</router-link>
            <router-link to="/winkelwagen">winkelwagen</router-link>
        </div>
    </header>
    <transition name="fade">
        <CookiemeldingComponent />
    </transition>
    <section id="inhoud">
        <h4>Nieuwe items</h4>
        <section id="nieuwe-items">
            <div class="item" v-for='(item, index) in items' :key="item.id">
                <div class="item-img">
                    <img v-bind:src="pathSmall + item.src" v-on:click="toonGroteFoto(item.src)">
                </div>
                <div class="item-body">
                    <div class="prijs">{{ item.prijs }}€</div>
                    <h4>{{ item.naam }}</h4>
                    <p>{{ item.omschrijving }}</p>
                    <transition name="button" appear>
                        <a href="#" class="knop" v-on:click.prevent="VoegToeAanWinkelwagen(index)">BESTEL</a>
                    </transition>
                    <transition name="items">
                        <p class="besteld" :key="item.id + '-' + item.besteld" v-if="item.besteld">Besteld:
                            {{ item.besteld }}
                        </p>
                    </transition>
                </div>
            </div>
        </section>
    </section>
</template>

<script>
import CookiemeldingComponent from "@/components/CookiemeldingComponent.vue";

export default {
    name: 'HomeRoute',
    components: {
        CookiemeldingComponent,
    },
    data: function () {
        return {
            titel: "Superhero store",
            subtitel: "Your break from the office life!",
            pathSmall: "./assets/images/small/",
            pathBig: "./assets/images/big/",
            showCookieMelding: false,
            items: [{
                id: 1,
                naam: "hondenpak superman",
                omschrijving: "Neem je hond mee als sidekick op al je avonturen!",
                prijs: 29.99,
                src: "elias-castillo-7-ToFEHzMNw-unsplash.jpg",
                besteld: 0,
            },
            {
                id: 2,
                naam: "Wonder Woman",
                omschrijving: "Laat de kleine meid tonen hoe speciaal ze is!",
                prijs: 34.99,
                src: "gabriela-braga-CVEWeDNsJP4-unsplash.jpg",
                besteld: 0,
            },
            {
                id: 3,
                naam: "Spiderman masker",
                omschrijving: "Je wil niet altijd dat je herkent wordt voor je goede daden!",
                prijs: 14.99,
                src: "joey-nicotra-0EI_4R2r0qg-unsplash.jpg",
                besteld: 0,
            }
            ],
            winkelwagen: [],
            aantalInWinkelwagen: 0,
            showWinkelwagen: true,


        }
    },
    methods: {
        toonGroteFoto: function (src) {
            window.open(this.pathBig + src);
        },
        check: function () {
            this.showCookieMelding = false;
            localStorage.setItem("showCookieMelding", false);
        },
        saveLocalStorageWinkelwagen: function () {
            let temp = this.items.filter((item) => item.besteld !== 0);
            localStorage.setItem("winkelwagen", JSON.stringify(temp));
        },
        VoegToeAanWinkelwagen: function (index) {
            this.items[index].besteld++;
            this.aantalInWinkelwagen++;
            this.saveLocalStorageWinkelwagen();

            this.showWinkelwagen = false;

            setTimeout(() => {
                this.showWinkelwagen = true;
            }, 500);
        },
    },

    mounted() {
        if (localStorage.getItem("winkelwagen")) {
            let tempLs = JSON.parse(localStorage.getItem("winkelwagen"));
            tempLs.forEach((itemInLs) => {
                let gevondenItemInData = this.items.find(itemInData =>
                    itemInData.id == itemInLs.id);
                if (gevondenItemInData) {
                    gevondenItemInData.besteld = itemInLs.besteld
                    this.aantalInWinkelwagen += (itemInLs.besteld)
                }
            })
        }
        if (localStorage.getItem("showCookieMelding")) {
            this.showCookieMelding = JSON.parse(localStorage.getItem("showCookieMelding"))
        } else {
            this.showCookieMelding = true;
        }
    }
}
</script>

<style>
body,
html {
    font-family: verdana, sans-serif;
    color: #666;
    background-color: #f9f9f9;
    margin: 0;
}

header {
    background: #770000;
    padding: 20px 60px;
    margin: 0;
    color: #ffeedd;
    border-bottom: 1px solid #ddd;
}

a {
    color: #ffeedd;
}

#cookies,
#inhoud {
    padding: 20px 30px;
}

#cookies {
    background-color: orange
}

#nieuwe-items {
    display: flex;
    justify-content: space-between;
}

.item {
    border: 2px solid #ccc;
    width: 300px;
    background-color: #fff;
    text-align: center;
    height: 550px
}

.besteld {
    position: relative;
    top: -250px;
    color: white;
    font-size: 29px;
    background: green
}

.item-img {
    width: 300px;
    height: 300px;
    background-color: #ddd;
}

.item-img img {
    cursor: pointer;
}

.item-body {
    padding: 25px;
    color: #789;
}

.item-body h4 {
    font-weight: bold;
    margin: 0;
}

.item-body .prijs {
    font-size: 2em;
    color: #009900;
    margin-bottom: 25px;
}

.knop {
    display: inline-block;
    text-decoration: none;
    background-color: #009900;
    color: #ffffff;
    padding: 6px 10px;
    border-radius: 6px;
    font-size: 0.75em;
    letter-spacing: 1px;
}

#winkelwagen {
    text-align: right;
}


.fade-enter-active,
.fade-leave-active {
    transition: .5s;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
    transform: translateX(500px);
}


.button-enter-active,
.button-leave-active {
    transition: all .8s;
}

.button-enter-from,
.button-leave-to {
    opacity: 0;
    transform: 1.3;
    transform: translateY(10px);
}

.items-enter-active {
    transition: .8s;
}

.items-enter-from,
.items-leave-to {
    opacity: 0;
    transform: 1.3;
    transform: translateY(10px);
}

.winkelwagen-enter-active,
.winkelwagen-leave-active {
    transition: 0.5s;
}

.winkelwagen-enter-from,
.winkelwagen-leave-to {
    opacity: 0;
    transform: translateX(50px);
}

.nav a {
    margin-right: 20px;
    text-decoration: none;
}

.nav a:hover {
    font-size: 16.5px;
    color: white;
}
</style>
