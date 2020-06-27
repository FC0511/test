<template>
    <div>
        <label class="notes">
            <span class="name">备注</span>
            <input type="text" :value="notes" @input="fn">

        </label>
    </div>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from 'vue-property-decorator';

    @Component
    export default class Notes extends Vue {
        @Prop(String) notes!: string;

        fn(event: MouseEvent) {
            const _input = (event.target as HTMLInputElement);
            this.$emit('update:notes', _input.value);
        }

        mounted() {
        }
    }
</script>

<style lang="scss" scoped>
    .notes {
        font-size: 14px;
        background: #f5f5f5;
        padding-left: 16px;
        display: flex;
        align-items: center;

        .name {
            padding-right: 16px;
        }

        input {
            height: 64px;
            flex-grow: 1;
            background: transparent;
            border: none;
            padding-right: 16px;
        }
    }
</style>