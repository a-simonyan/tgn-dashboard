<template>
  <div class="main">
    <EditorDocumentList @change-document="changeCurrentDoc" />
    <EditorPDF :current-doc="currentDoc" @add-article="addArticle" />
  </div>
</template>

<script>
import EditorDocumentList from "@/components/editor/EditorDocumentList";
import EditorPDF from "@/components/editor/EditorPDF";
export default {
  name: "EditPage",
  components: { EditorDocumentList, EditorPDF },
  data() {
    return {
      currentDoc: {},
    };
  },
  methods: {
    changeCurrentDoc(val) {
      this.currentDoc = val;
    },
    addArticle(title) {
      this.currentDoc.articlesArray.push(title);
    },
  },
};
</script>

<style scoped lang="scss">
.main {
  display: flex;
  justify-content: space-between;
}
</style>
