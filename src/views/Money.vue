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
    import recordListModel from '@/models/recordListModel';
    import tagListModel from '@/models/tagListModel';

    import {Component, Vue, Watch} from 'vue-property-decorator';

    const recordList = recordListModel.fetch();
    const tagList = tagListModel.fetch();

    @Component({
        components: {Types, Tags, Notes, NumberPad},
    })
    export default class Money extends Vue {
        tags = tagList;
        recordList: RecordItem[] = recordList;

        record: RecordItem = {
            tags: [],
            notes: '',
            type: '-',
            amount: '0'
        };

        onUpdateTags(value: string[]) {
            this.record.tags = value;
        }


        saveRecord() {
            const record2: RecordItem = recordListModel.clone(this.record);
            record2.createdAt = new Date();
            this.recordList.push(record2);
        }

        @Watch('recordList')
        onRecordListChange() {
            recordListModel.save(this.recordList);
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

