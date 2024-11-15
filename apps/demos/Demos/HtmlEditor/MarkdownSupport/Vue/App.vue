<template>
  <div class="widget-container">
    <DxHtmlEditor
      v-model:value="valueContent"
      :height="300"
      :converter="converter"
    >
      <DxToolbar>
        <DxItem name="undo"/>
        <DxItem name="redo"/>
        <DxItem name="separator"/>
        <DxItem name="bold"/>
        <DxItem name="italic"/>
        <DxItem name="separator"/>
        <DxItem
          name="header"
          :accepted-values="headerValues"
          :options="headerOptions"
        />
      </DxToolbar>
    </DxHtmlEditor>

    <div class="options">
      <div class="value-title">
        Contents of the value option
      </div>
      <div
        class="value-content"
        tabindex="0"
      >
        {{ valueContent }}
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import {
  DxHtmlEditor,
  DxToolbar,
  DxItem,
} from 'devextreme-vue/html-editor';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
// eslint-disable-next-line spellcheck/spell-checker
import remarkRehype from 'remark-rehype';
// eslint-disable-next-line spellcheck/spell-checker
import rehypeStringify from 'rehype-stringify';
// eslint-disable-next-line spellcheck/spell-checker
import rehypeParse from 'rehype-parse';
// eslint-disable-next-line spellcheck/spell-checker
import rehypeRemark from 'rehype-remark';
import remarkStringify from 'remark-stringify';
import { markup } from './data.ts';

const valueContent = ref(markup);
const headerValues = [false, 1, 2, 3, 4, 5];
const headerOptions = { inputAttr: { 'aria-label': 'Font family' } };
const converter = {
  toHtml(value) {
    const result = unified()
      .use(remarkParse)
      // eslint-disable-next-line spellcheck/spell-checker
      .use(remarkRehype)
      // eslint-disable-next-line spellcheck/spell-checker
      .use(rehypeStringify)
      .processSync(value)
      .toString();

    return result;
  },
  fromHtml(value) {
    const result = unified()
      // eslint-disable-next-line spellcheck/spell-checker
      .use(rehypeParse)
      // eslint-disable-next-line spellcheck/spell-checker
      .use(rehypeRemark)
      .use(remarkStringify)
      .processSync(value)
      .toString();

    return result;
  },
};
</script>
<style>
.value-title {
  font-size: 18px;
  font-weight: 500;
}

.value-content {
  margin-top: 20px;
  overflow: auto;
  height: 110px;
  width: 100%;
  white-space: pre-wrap;
}

.options {
  margin-top: 20px;
  padding: 20px;
  background-color: rgba(191, 191, 191, 0.15);
  box-sizing: border-box;
  width: 100%;
}
</style>
