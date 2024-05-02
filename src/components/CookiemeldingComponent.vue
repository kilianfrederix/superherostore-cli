<template>
    <section id="cookies" v-if="showCookieMelding">
        <p>Deze site maakt gebruik van cookies. Door de site verder te gebruiken stem je toe met het gebruik van
            deze cookies.
        </p>
        <label><input type="checkbox" v-on:change="check()">Deze melding niet meer tonen.</label>
    </section>
</template>

<script>
export default {
    props: ["showCookieMelding", "check"],
    data: function () {
        return {};
    },
}
</script>