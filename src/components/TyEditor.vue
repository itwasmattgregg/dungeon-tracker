<template>
  <div>

    <editor class="editor"
            :extensions="extensions"
            ref="editor">
      <div class="menubar"
           slot="menubar"
           slot-scope="{ nodes, marks }">
        <div v-if="nodes && marks">

          <button class="menubar__button"
                  :class="{ 'is-active': marks.bold.active() }"
                  @click="marks.bold.command">
            <v-icon>fa-bold</v-icon>
          </button>

          <button class="menubar__button"
                  :class="{ 'is-active': marks.italic.active() }"
                  @click="marks.italic.command">
            <v-icon>fa-italic</v-icon>
          </button>

          <button class="menubar__button"
                  :class="{ 'is-active': marks.underline.active() }"
                  @click="marks.underline.command">
            <v-icon>fa-underline</v-icon>
          </button>

          <button class="menubar__button"
                  :class="{ 'is-active': nodes.paragraph.active() }"
                  @click="nodes.paragraph.command">
            <v-icon>fa-paragraph</v-icon>
          </button>

          <button class="menubar__button"
                  :class="{ 'is-active': nodes.heading.active({ level: 1 }) }"
                  @click="nodes.heading.command({ level: 1 })">
            H1
          </button>

          <button class="menubar__button"
                  :class="{ 'is-active': nodes.heading.active({ level: 2 }) }"
                  @click="nodes.heading.command({ level: 2 })">
            H2
          </button>

          <button class="menubar__button"
                  :class="{ 'is-active': nodes.heading.active({ level: 3 }) }"
                  @click="nodes.heading.command({ level: 3 })">
            H3
          </button>

          <button class="menubar__button"
                  :class="{ 'is-active': nodes.bullet_list.active() }"
                  @click="nodes.bullet_list.command">
            <v-icon>fa-list-ul</v-icon>
          </button>

          <button class="menubar__button"
                  :class="{ 'is-active': nodes.ordered_list.active() }"
                  @click="nodes.ordered_list.command">
            <v-icon>fa-list-ol</v-icon>
          </button>

        </div>
      </div>
      <div class="editor__content"
           slot="content"
           slot-scope="props">
        <h2>
          Suggestions
        </h2>
        <p>
          Sometimes it's useful to <strong>mention</strong> someone. That's a
          feature we're very used to. Under the hood this technique can also be
          used for other features likes <strong>hashtags</strong> and <strong>commands</strong>
          – lets call it <em>suggestions</em>.
        </p>
        <p>
          This is an example how to mention some users like <span
                data-mention-id="1">Philipp Kühn</span> or <span
                data-mention-id="2">Hans Pagel</span>. Try to type <code>@</code>
          and a popup (rendered with tippy.js) will appear. You can navigate
          with arrow keys through a list of suggestions.
        </p>
      </div>
    </editor>

    <div class="suggestion-list"
         v-show="showSuggestions"
         ref="suggestions">
      <template v-if="hasResults">
        <div v-for="(user, index) in filteredUsers"
             :key="user.id"
             class="suggestion-list__item"
             :class="{ 'is-selected': navigatedUserIndex === index }"
             @click="selectUser(user)">
          {{ user.name }}
        </div>
      </template>
      <div v-else
           class="suggestion-list__item is-empty">
        No users found
      </div>
    </div>

  </div>
</template>

<script>
import Fuse from "fuse.js";
import tippy from "tippy.js";
import { Editor } from "tiptap";
import {
  HardBreakNode,
  HeadingNode,
  MentionNode,
  BoldMark,
  ItalicMark,
  BlockquoteNode,
  BulletListNode,
  ListItemNode,
  OrderedListNode,
  TodoItemNode,
  TodoListNode,
  UnderlineMark,
  HistoryExtension
} from "tiptap-extensions";
export default {
  name: "TyEditor",
  components: {
    Editor
  },
  data() {
    return {
      people: [
        { id: 1, name: "Philipp Kühn" },
        { id: 2, name: "Hans Pagel" },
        { id: 3, name: "Kris Siepert" },
        { id: 4, name: "Justin Schueler" },
        { id: 5, name: "Corin McHargue" }
      ],
      extensions: [
        new MentionNode({
          // a list of all suggested items
          items: [
            { id: 1, name: "Philipp Kühn" },
            { id: 2, name: "Hans Pagel" },
            { id: 3, name: "Kris Siepert" },
            { id: 4, name: "Justin Schueler" },
            { id: 5, name: "Corin McHargue" }
          ],
          // is called when a suggestion starts
          onEnter: ({ items, query, range, command, virtualNode }) => {
            this.query = query;
            this.filteredUsers = items;
            this.suggestionRange = range;
            this.renderPopup(virtualNode);
            // we save the command for inserting a selected mention
            // this allows us to call it inside of our custom popup
            // via keyboard navigation and on click
            this.insertMention = command;
          },
          // is called when a suggestion has changed
          onChange: ({ items, query, range, virtualNode }) => {
            this.query = query;
            this.filteredUsers = items;
            this.suggestionRange = range;
            this.navigatedUserIndex = 0;
            this.renderPopup(virtualNode);
          },
          // is called when a suggestion is cancelled
          onExit: () => {
            // reset all saved values
            this.query = null;
            this.filteredUsers = [];
            this.suggestionRange = null;
            this.navigatedUserIndex = 0;
            this.destroyPopup();
          },
          // is called on every keyDown event while a suggestion is active
          onKeyDown: ({ event }) => {
            // pressing up arrow
            if (event.keyCode === 38) {
              this.upHandler();
              return true;
            }
            // pressing down arrow
            if (event.keyCode === 40) {
              this.downHandler();
              return true;
            }
            // pressing enter
            if (event.keyCode === 13) {
              this.enterHandler();
              return true;
            }
            return false;
          },
          // is called when a suggestion has changed
          // this function is optional because there is basic filtering built-in
          // you can overwrite it if you prefer your own filtering
          // in this example we use fuse.js with support for fuzzy search
          onFilter: (items, query) => {
            if (!query) {
              return items;
            }
            const fuse = new Fuse(items, {
              threshold: 0.2,
              keys: ["name"]
            });
            return fuse.search(query);
          }
        }),
        new HardBreakNode(),
        new HeadingNode({ maxLevel: 3 }),
        new CodeMark(),
        new BoldMark(),
        new ItalicMark(),
        new BlockquoteNode(),
        new BulletListNode(),
        new ListItemNode(),
        new OrderedListNode(),
        new TodoItemNode(),
        new TodoListNode(),
        new BoldMark(),
        new ItalicMark(),
        new UnderlineMark(),
        new HistoryExtension()
      ],

      query: null,
      suggestionRange: null,
      filteredUsers: [],
      navigatedUserIndex: 0,
      insertMention: () => {}
    };
  },
  computed: {
    hasResults() {
      return this.filteredUsers.length;
    },
    showSuggestions() {
      return this.query || this.hasResults;
    }
  },
  methods: {
    // navigate to the previous item
    // if it's the first item, navigate to the last one
    upHandler() {
      this.navigatedUserIndex =
        (this.navigatedUserIndex + this.filteredUsers.length - 1) %
        this.filteredUsers.length;
    },
    // navigate to the next item
    // if it's the last item, navigate to the first one
    downHandler() {
      this.navigatedUserIndex =
        (this.navigatedUserIndex + 1) % this.filteredUsers.length;
    },
    enterHandler() {
      const user = this.filteredUsers[this.navigatedUserIndex];
      if (user) {
        this.selectUser(user);
      }
    },
    // we have to replace our suggestion text with a mention
    // so it's important to pass also the position of your suggestion text
    selectUser(user) {
      this.insertMention({
        range: this.suggestionRange,
        attrs: {
          id: user.id,
          label: user.name
        }
      });
      this.$refs.editor.focus();
    },
    // renders a popup with suggestions
    // tiptap provides a virtualNode object for using popper.js (or tippy.js) for popups
    renderPopup(node) {
      if (this.popup) {
        return;
      }
      this.popup = tippy(node, {
        content: this.$refs.suggestions,
        trigger: "mouseenter",
        interactive: true,
        theme: "dark",
        placement: "top-start",
        performance: true,
        inertia: true,
        duration: [400, 200],
        showOnInit: true,
        arrow: true,
        arrowType: "round"
      });
    },
    destroyPopup() {
      if (this.popup) {
        this.popup.destroyAll();
        this.popup = null;
      }
    }
  }
};
</script>

<style lang="scss">
$color-black: black;
$color-white: white;
@import "tippy.js/dist/tippy.css";

.editor {
  position: relative;
  max-width: 30rem;
  margin: 0 auto 5rem auto;

  &__content {
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
