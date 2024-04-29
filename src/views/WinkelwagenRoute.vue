<template>
    <div>
        <header id="main-header">
            <h1><router-link to="/">{{ titel }}</router-link></h1>
            <h5>{{ subtitel }}</h5>
            <p id="winkelwagen">Items in winkelwagen: {{ totaalAantalItems }}</p>
            <div class="nav">
                <router-link to="/">Home</router-link>
                <router-link to="/winkelwagen">winkelwagen</router-link>
            </div>
        </header>
        <transition name="cookie">
            <CookiemeldingComponent />
        </transition>
        <section id="inhoud">
            <h4>Gekozen items</h4>
            <section id="nieuwe-items">
                <transition name="itemTransition" tag="div">
                    <div v-if="items.length > 0">
                        <transition-group name="itemTransition" tag="div">
                            <div class="item" v-for="(item, index) in items" :key="item.id">
                                <div class="item-img">
                                    <img :src="pathSmall + item.src" @click="toonGroteFoto(item.src)">
                                </div>
                                <div class="item-body">
                                    <div class="prijs">{{ (parseFloat(item.prijs) * parseFloat(item.besteld)).toFixed(2)
                                        }}€</div>
                                    <h4>{{ item.naam }}</h4>
                                    <p>{{ item.omschrijving }}</p>
                                    <input type="number" v-model="item.besteld" size="2"
                                        @change="aantalAanpassing(index)">
                                    <a href="#" class="knop" @click.prevent="verwijder(index)">verwijder</a>
                                </div>
                            </div>
                            <div>
                                <p class="totaal">Totaal: {{ totalePrijs.toFixed(2) }}</p>
                            </div>
                        </transition-group>
                    </div>
                    <div v-else>
                        <p>Geen items</p>
                    </div>
                </transition>
            </section>
        </section>
    </div>
</template>

<script>
import CookiemeldingComponent from "@/components/CookiemeldingComponent.vue";

export default {
    name: 'WinkelwagenRoute',
    components: {
        CookiemeldingComponent,
    },
    data() {
        return {
            titel: "Superhero store",
            subtitel: "Your break from the office life!",
            pathSmall: "./assets/images/small/",
            pathBig: "./assets/images/big/",
            showCookieMelding: false,
            items: []
        };
    },
    methods: {
        toonGroteFoto(src) {
            window.open(this.pathBig + src);
        },
        check() {
            localStorage.setItem("showCookieMelding", JSON.stringify(this.showCookieMelding));
        },
        verwijder(index) {
            this.items.splice(index, 1);
            this.saveLocalStorageWinkelwagen();
        },
        aantalAanpassing(index) {
            if (this.items[index].besteld === 0) {
                this.items.splice(index, 1);
            }
            this.saveLocalStorageWinkelwagen();
        },
        saveLocalStorageWinkelwagen() {
            localStorage.setItem("winkelwagen", JSON.stringify(this.items));
        }
    },
    computed: {
        totalePrijs() {
            let totaal = 0;
            this.items.forEach(item => {
                if (item.besteld > 0) {
                    totaal += item.besteld * item.prijs;
                }
            });
            return totaal;
        },
        totaalAantalItems() {
            let totaal = 0;
            if (this.items.length > 0) {
                this.items.forEach(item => {
                    if (item.besteld > 0) {
                        totaal += parseInt(item.besteld);
                    }
                });
            }
            return totaal;
        }
    },
    mounted() {
        if (localStorage.getItem("winkelwagen")) {
            this.items = JSON.parse(localStorage.getItem("winkelwagen"));
        }
        if (localStorage.getItem("showCookieMelding")) {
            this.showCookieMelding = JSON.parse(localStorage.getItem("showCookieMelding"));
        } else {
            this.showCookieMelding = true;
        }
    }
};
</script>

<style scoped>
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

h1 a {
    text-decoration: none;
    color: #ffeedd;
}

#cookies {
    padding: 20px 30px;
    background-color: orange;
}

#nieuwe-items {
    display: flex-row;
    justify-content: space-between;
}

.item {
    border: 2px solid #ccc;
    width: 800px;
    background-color: #fff;
    text-align: right;
    margin-bottom: 50px;
}

.item-img {
    width: 100px;
    height: 100px;
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

.item-body .prijs,
input,
.totaal {
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

.cookie-enter-active,
.cookie-leave-active {
    transition: .5s;
}

.cookie-enter-from,
.cookie-leave-to {
    opacity: 0;
    transform: translateX(500px);
}

.itemTransition-enter-active,
.itemTransition-leave-active {
    transition: .5s;
}

.itemTransition-enter-from,
.itemTransition-leave-to {
    opacity: 0;
    transform: translateX(-200px);
}
</style>
