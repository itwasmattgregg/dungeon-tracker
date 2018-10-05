<template>
  <div>
		<editor :extensions="extensions" class="editor">

			<div class="menubar" slot="menubar" slot-scope="{ nodes, marks }">
				<div v-if="nodes && marks">

					<button
						class="menubar__button"
						:class="{ 'is-active': marks.bold.active() }"
						@click="marks.bold.command"
					>
						<v-icon>fa-bold</v-icon>
					</button>

					<button
						class="menubar__button"
						:class="{ 'is-active': marks.italic.active() }"
						@click="marks.italic.command"
					>
						<v-icon>fa-italic</v-icon>
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
						:class="{ 'is-active': nodes.todo_list.active() }"
						@click="nodes.todo_list.command"
					>
						<v-icon>fa-check-square</v-icon>
					</button>

				</div>
			</div>

			<div class="editor__content" slot="content" slot-scope="props">
				<p>
					There is always something to do. Thankfully, there are checklists for that. Don't forget to call mom.
				</p>
				<ul data-type="todo_list">
					<li data-type="todo_item" data-done="true">
						Buy beer
					</li>
					<li data-type="todo_item" data-done="true">
						Buy meat
					</li>
					<li data-type="todo_item" data-done="true">
						Buy milk
					</li>
					<li data-type="todo_item" data-done="false">
						Call mom
					</li>
				</ul>
			</div>

		</editor>
	</div>
</template>

<script>
// Import the editor
import { Editor } from 'tiptap'
import {
	CodeBlockNode,
	HardBreakNode,
	HeadingNode,
	TodoItemNode,
	TodoListNode,
	BoldMark,
	CodeMark,
	ItalicMark,
} from 'tiptap-extensions'

export default {
  name: 'TyEditor',
  components: {
    Editor,
  },
  data() {
		return {
			customProp: 2,
			extensions: [
				new CodeBlockNode(),
				new HardBreakNode(),
				new HeadingNode({ maxLevel: 3 }),
				new TodoItemNode(),
				new TodoListNode(),
				new BoldMark(),
				new CodeMark(),
				new ItalicMark(),
			],
		}
	},
}
</script>

<style lang="scss">
$color-black: black;
$color-white: white;
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
</style>
