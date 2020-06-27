<template>
    <Layout class-prefix="layout">
        {{record}}
        <NumberPad :num.sync="record.amount" @submit="saveRecord"/>
        <Types :type.sync="record.type"/>
        <Notes :notes.sync="record.notes"/>
        <Tags :data-source.sync="tags" @update:value="onUpdateTags"/>
    </Layout>
</template>

<script lang="ts">
    /*import x from '@/assets/icons/money.svg'
    console.log(x);*/
    import NumberPad from '@/components/Money/NumberPad.vue';
    import Tags from '@/components/Money/Tags.vue';
    import Notes from '@/components/Money/Notes.vue';
    import Types from '@/components/Money/Types.vue';

    import {Component, Vue, Watch} from 'vue-property-decorator';

    type Record = {
        tags: string[]
        notes: string
        type: string,
        amount: string // 数据类型 object | string
        createdAt?: Date  // 类 / 构造函数
    }

    const recordList: Record[] = JSON.parse(window.localStorage.getItem('recordList') || '[]');

    @Component({
        components: {Types, Tags, Notes, NumberPad},
    })
    export default class Money extends Vue {
        tags = ['衣', '食', '住', '行'];
        recordList: Record[] = recordList;

        record: Record = {
            tags: [],
            notes: '',
            type: '-',
            amount: '0'
        };

        onUpdateTags(value: string[]) {
            this.record.tags = value;
        }


        saveRecord() {
            const record2: Record = JSON.parse(JSON.stringify(this.record));
            record2.createdAt = new Date();
            this.recordList.push(record2);
        }
        @Watch('recordList')
        onRecordListChange() {
            window.localStorage.setItem('recordList', JSON.stringify(this.recordList));
        }
    }
</script>

<style lang="scss">
    .layout-content {
        display: flex;
        flex-direction: column-reverse;
    }
</style>
<style lang="scss" scoped>

</style>

