<template>
  <div v-loading="isLoadingMockData" class="editor">
    <div class="editor__header">
      <div class="editor__pagination-box">
        <el-button
          link
          @click="changeCurrentPage('prev')"
          :disabled="currentPage === 1"
        >
          <div class="editor__pagination-box--btn-content">
            <img
              class="editor__pagination-box--vector"
              src="@/assets/images/icons/vector-icon.svg"
              alt="<"
            />
            <div class="editor__pagination-box--btn-text">Previous Page</div>
          </div>
        </el-button>
        <div class="editor__pagination-box--numbers">
          Page {{ currentPage }} / {{ total }}
        </div>
        <el-button
          link
          @click="changeCurrentPage('next')"
          :disabled="currentPage === total || total === 0"
        >
          <div class="editor__pagination-box--btn-content">
            <div class="editor__pagination-box--btn-text">Next Page</div>
            <img src="@/assets/images/icons/vector-icon.svg" alt=">" />
          </div>
        </el-button>
      </div>
      <div class="editor__buttons-box">
        <el-button class="editor__buttons-box--confirm">
          <div class="editor__buttons-box--btn-content">
            <img src="@/assets/images/icons/done-icon.svg" alt="confirm" />
            <div>Confirm publication</div>
          </div>
        </el-button>
        <el-button class="editor__buttons-box--save">
          <img src="@/assets/images/icons/save-icon.svg" alt="save" />
        </el-button>
      </div>
    </div>
    <div class="editor__body">
      <div class="editor__pdf-box" v-loading="isLoadingFile">
        <pdf :page="currentPage" :src="currentDoc.src" ref="pdfFile"></pdf>
      </div>
      <div class="editor__article-box">
        <div class="editor__article-box--header">
          <div class="editor__article-box--doc-name">
            {{ currentDoc.fileName }}
          </div>
          <el-button
            class="editor__article-box--button"
            @click="addArticle(currentPage)"
          >
            <img src="@/assets/images/icons/plus-icon.svg" alt="+" />
          </el-button>
        </div>
        <div class="editor__article-box--body">
          <el-collapse v-model="activeNames">
            <el-collapse-item
              v-for="(article, j) in currentDoc.articlesArray"
              :key="`article_${j}`"
              :title="article"
              :name="j"
            >
            </el-collapse-item>
          </el-collapse>
        </div>
      </div>
      <div class="editor__pdf-pagination-box">
        <div
          v-for="(item, i) in currentDoc.thumbnails"
          :key="`item_${i}`"
          :class="{ isActive: currentPage === i + 1 }"
          class="editor__pdf-pagination-box--item"
          :style="{ 'background-image': `url(${item})` }"
          @click="changeCurrentPage(i + 1)"
        >
          <div class="editor__pdf-pagination-box--item-number">{{ i + 1 }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import pdf from "vue3-pdf";

export default {
  name: "EditorPDF",
  components: {
    pdf,
  },
  data() {
    return {
      currentPage: 1,
      isLoadingFile: false,
      activeNames: [],
    };
  },
  props: {
    currentDoc: Object,
  },
  methods: {
    changeCurrentPage(v) {
      v === "next"
        ? this.currentPage++
        : v === "prev"
        ? this.currentPage--
        : (this.currentPage = v);
    },
    addArticle(v) {
      if (this.currentDoc.articlesArray.find((el) => el === `Page ${v}`)) {
        return;
      } else this.$emit("add-article", `Page ${v}`);
    },
  },
  watch: {
    "currentDoc.src"(v) {
      this.currentPage = 1;
      this.$nextTick(() => {
        this.isLoadingFile = true;
        const loadingTask = pdf.createLoadingTask(v);
        loadingTask.promise.then((pdf) => {
          this.total = pdf._pdfInfo.numPages;
          this.isLoadingFile = false;
        });
      });
    },
  },
};
</script>

<style scoped lang="scss">
.editor {
  width: calc(100% - 403px);
  background-color: #fff;
  border-radius: 5px;
  height: calc(100vh - 122px);
  margin-top: 69px;
  &__header {
    padding: 0 17px 0 37.5px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 43px;
    border-bottom: 1px solid $color--border;
  }
  &__body {
    display: flex;
    height: calc(100% - 43px);
  }
  &__pagination-box {
    display: flex;
    align-items: center;
    &--btn-content {
      display: flex;
    }
    &--btn-text {
      color: $color--primary;
      font-size: 14px;
      font-weight: 700;
      padding-left: 14px;
    }
    &--btn-text:first-child {
      padding-left: 0;
      padding-right: 14px;
    }
    &--vector {
      transform: rotate(180deg);
    }
    &--numbers {
      font-size: 14px;
      width: 180px;
      text-align: center;
      font-family: Inter;
    }
  }
  &__buttons-box {
    display: flex;
    gap: 10px;
    align-items: center;
    &--confirm {
      background-color: #58a942;
    }
    &--save {
      width: 25px;
      height: 25px;
      background-color: $color--light-gray;
      border: none;
    }
    &--btn-content {
      display: flex;
      align-items: center;
      padding: 0 8px;
      div {
        margin-left: 8px;
        font-size: 14px;
        font-weight: 700;
        color: #fff;
      }
    }
  }
  &__pdf-box {
    overflow-y: auto;
    height: calc(100% - 43px);
    width: 650px;
    border-right: 1px solid $color--border;
    &::-webkit-scrollbar {
      display: none;
    }
  }
  &__article-box {
    width: calc(100% - 742px);
    &--header {
      height: 50px;
      border-bottom: 1px solid $color--border;
      padding: 0 17px 0 27px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    &--doc-name {
      font-size: 16px;
      font-weight: 700;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }
    &--button {
      width: 25px;
      height: 25px;
      background-color: $color--light-gray;
    }
  }

  &__pdf-pagination-box {
    width: 92px;
    border-left: 1px solid $color--border;
    &--item {
      width: 66px;
      height: 93.5px;
      box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);
      margin: 8px auto 0 auto;
      cursor: pointer;
      display: flex;
      justify-content: flex-end;
      border: 2px solid #fff;
      background-repeat: no-repeat;
      background-size: 100% 100%;
    }
    &--item-number {
      width: 35px;
      height: 19px;
      border: 1px solid #c4c4c4;
      background-color: #fff;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 12px;
      font-weight: 500;
    }
  }
}
.is-disabled {
  opacity: 0.3 !important;
  cursor: default !important;
}
.isActive {
  border: 2px solid #4694d1;
}
:deep(.el-collapse-item__header) {
  position: relative;
  padding-left: 27px;
  height: 37px;
  color: $color--black;
  font-weight: 500;
  font-size: 14px;
  i {
    position: absolute;
    left: 9px;
    width: 9px;
    height: 9px;
    background-image: url("../../assets/images/icons/arrow-right-icon.svg");
    background-repeat: no-repeat;
    background-position: center;
    border-bottom: none !important;
    svg {
      display: none;
    }
  }
}
:deep(.is-active) {
  border-bottom: 1px solid $color--border;
}
@media (max-width: 1380px) {
  .editor {
    width: calc(100% - 317px);
  }
}
</style>
