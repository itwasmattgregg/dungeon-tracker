<template>
  <div>
    <editor
      class="editor"
      :extensions="extensions"
    >
      <div
        class="menubar is-hidden"
        :class="{ 'is-focused': focused }"
        slot="menubar"
        slot-scope="{ nodes, marks, focused }"
      >
        <div v-if="nodes && marks">

          <button
            class="menubar__button"
            :class="{ 'is-active': marks.bold.active() }"
            @click="marks.bold.command"
          >
            <v-icon>format_bold</v-icon>
          </button>

          <button
            class="menubar__button"
            :class="{ 'is-active': marks.italic.active() }"
            @click="marks.italic.command"
          >
            <v-icon>format_italic</v-icon>
          </button>

          <button
            class="menubar__button"
            :class="{ 'is-active': nodes.heading.active({ level: 1 }) }"
            @click="nodes.heading.command({ level: 1 })"
          >
            H1
          </button>

          <button
            class="menubar__button"
            :class="{ 'is-active': nodes.heading.active({ level: 2 }) }"
            @click="nodes.heading.command({ level: 2 })"
          >
            H2
          </button>

          <button
            class="menubar__button"
            :class="{ 'is-active': nodes.heading.active({ level: 3 }) }"
            @click="nodes.heading.command({ level: 3 })"
          >
            H3
          </button>

          <button
            class="menubar__button"
            :class="{ 'is-active': nodes.bullet_list.active() }"
            @click="nodes.bullet_list.command"
          >
            <v-icon>format_list_bulleted</v-icon>
          </button>

          <button
            class="menubar__button"
            :class="{ 'is-active': nodes.ordered_list.active() }"
            @click="nodes.ordered_list.command"
          >
            <v-icon>format_list_numbered</v-icon>
          </button>
        </div>
      </div>

      <div
        class="editor__content"
        slot="content"
        slot-scope="props"
      >
      </div>
    </editor>
  </div>
</template>

<script>
import { Editor } from 'tiptap'
import {
  BlockquoteNode,
  BulletListNode,
  CodeBlockNode,
  HardBreakNode,
  HeadingNode,
  ListItemNode,
  OrderedListNode,
  TodoItemNode,
  TodoListNode,
  BoldMark,
  CodeMark,
  ItalicMark,
  LinkMark,
  HistoryExtension
} from 'tiptap-extensions'
export default {
  components: {
    Editor
  },
  data () {
    return {
      content: {
        type: 'doc',
        content: [
          {
            type: 'paragraph',
            content: [
              {
                type: 'text',
                text: 'This is some inserted text. 👋'
              }
            ]
          }
        ]
      },
      extensions: [
        new BlockquoteNode(),
        new BulletListNode(),
        new CodeBlockNode(),
        new HardBreakNode(),
        new HeadingNode({ maxLevel: 3 }),
        new ListItemNode(),
        new OrderedListNode(),
        new TodoItemNode(),
        new TodoListNode(),
        new BoldMark(),
        new CodeMark(),
        new ItalicMark(),
        new LinkMark(),
        new HistoryExtension()
      ]
    }
  }
}
</script>
<style lang="scss">
$color-black: black;
$color-white: white;
@import "tippy.js/dist/tippy.css";

.editor {
  position: relative;
  margin: 0 auto 5rem auto;

  &__content {
    border: 5px solid #009688;
    padding: 1em;
    border-radius: 20px;

    pre {
      padding: 0.7rem 1rem;
      border-radius: 5px;
      background: $color-black;
      color: $color-white;
      font-size: 0.8rem;
      overflow-x: auto;

      code {
        display: block;
      }
    }

    p code {
      display: inline-block;
      padding: 0 0.4rem;
      border-radius: 5px;
      font-size: 0.8rem;
      font-weight: bold;
      background: rgba($color-black, 0.1);
      color: rgba($color-black, 0.8);
    }

    ul,
    ol {
      padding-left: 1rem;
    }

    a {
      color: inherit;
    }

    blockquote {
      border-left: 3px solid rgba($color-black, 0.1);
      color: rgba($color-black, 0.8);
      padding-left: 0.8rem;
      font-style: italic;

      p {
        margin: 0;
      }
    }

    img {
      max-width: 100%;
      border-radius: 3px;
    }
  }
}
.menubar {
  display: flex;
  margin-bottom: 1rem;
  transition: visibility 0.2s 0.4s, opacity 0.2s 0.4s;

  &.is-hidden {
    visibility: hidden;
    opacity: 0;
  }

  &.is-focused {
    visibility: visible;
    opacity: 1;
    transition: visibility 0.2s, opacity 0.2s;
  }

  &__button {
    font-weight: bold;
    display: inline-flex;
    background: transparent;
    border: 0;
    color: $color-black;
    padding: 0.2rem 0.5rem;
    margin-right: 0.2rem;
    border-radius: 3px;
    cursor: pointer;

    &:hover {
      background-color: rgba($color-black, 0.05);
    }

    &.is-active {
      background-color: rgba($color-black, 0.1);
    }
  }
}

ul[data-type="todo_list"] {
  padding-left: 0;
}
li[data-type="todo_item"] {
  display: flex;
  flex-direction: row;
}
.todo-checkbox {
  border: 2px solid $color-black;
  height: 0.9em;
  width: 0.9em;
  box-sizing: border-box;
  margin-right: 10px;
  margin-top: 0.3rem;
  user-select: none;
  -webkit-user-select: none;
  cursor: pointer;
  border-radius: 0.2em;
  background-color: transparent;
  transition: 0.4s background;
}
.todo-content {
  flex: 1;
}
li[data-done="true"] {
  text-decoration: line-through;
}
li[data-done="true"] .todo-checkbox {
  background-color: $color-black;
}
li[data-done="false"] {
  text-decoration: none;
}
.menububble {
  position: absolute;
  display: flex;
  z-index: 20;
  background: $color-black;
  border-radius: 5px;
  padding: 0.3rem;
  margin-bottom: 0.5rem;
  transform: translateX(-50%);
  visibility: hidden;
  opacity: 0;
  transition: opacity 0.2s, visibility 0.2s;

  &__button {
    display: inline-flex;
    background: transparent;
    border: 0;
    color: $color-white;
    padding: 0.2rem 0.5rem;
    margin-right: 0.2rem;
    border-radius: 3px;
    cursor: pointer;

    &:last-child {
      margin-right: 0;
    }

    &:hover {
      background-color: rgba($color-white, 0.1);
    }

    &.is-active {
      background-color: rgba($color-white, 0.2);
    }
  }

  &__form {
    display: flex;
    align-items: center;
  }

  &__input {
    font: inherit;
    border: none;
    background: transparent;
    color: $color-white;
  }
}
.mention {
  background: rgba($color-black, 0.1);
  color: rgba($color-black, 0.6);
  font-size: 0.8rem;
  font-weight: bold;
  border-radius: 5px;
  padding: 0.2rem 0.5rem;
  white-space: nowrap;
}
.mention-suggestion {
  color: rgba($color-black, 0.6);
}
.suggestion-list {
  padding: 0.2rem;
  border: 2px solid rgba($color-black, 0.1);
  font-size: 0.8rem;
  font-weight: bold;
  &__no-results {
    padding: 0.2rem 0.5rem;
  }
  &__item {
    border-radius: 5px;
    padding: 0.2rem 0.5rem;
    margin-bottom: 0.2rem;
    cursor: pointer;
    &:last-child {
      margin-bottom: 0;
    }
    &.is-selected,
    &:hover {
      background-color: rgba($color-white, 0.2);
    }
    &.is-empty {
      opacity: 0.5;
    }
  }
}
.tippy-tooltip.dark-theme {
  background-color: $color-black;
  padding: 0;
  font-size: 1rem;
  text-align: inherit;
  color: $color-white;
  border-radius: 5px;
  .tippy-backdrop {
    display: none;
  }
  .tippy-roundarrow {
    fill: $color-black;
  }
  .tippy-popper[x-placement^="top"] & .tippy-arrow {
    border-top-color: $color-black;
  }
  .tippy-popper[x-placement^="bottom"] & .tippy-arrow {
    border-bottom-color: $color-black;
  }
  .tippy-popper[x-placement^="left"] & .tippy-arrow {
    border-left-color: $color-black;
  }
  .tippy-popper[x-placement^="right"] & .tippy-arrow {
    border-right-color: $color-black;
  }
}
</style>
