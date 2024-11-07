/* eslint-disable react-hooks/rules-of-hooks */
import { Editor as CoreEditor } from '@isle/editor'
import {
  AppContext,
  ComponentInternalInstance,
  ComponentPublicInstance,
  customRef,
  markRaw,
  Ref,
} from 'vue'

function useDebouncedRef(value) {
  return customRef((track, trigger) => {
    return {
      get() {
        track()
        return value
      },
      set(newValue) {
        // update state
        value = newValue

        // update view as soon as possible
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            trigger()
          })
        })
      },
    }
  })
}

export class Editor extends CoreEditor {
  contentComponent = null

  appContext = null

  constructor(options = {}) {
    super(options)

    this.reactiveState = useDebouncedRef(this.view.state)
    this.reactiveExtensionStorage = useDebouncedRef(this.extensionStorage)

    this.on('beforeTransaction', ({ nextState }) => {
      this.reactiveState.value = nextState
      this.reactiveExtensionStorage.value = this.extensionStorage
    })

    return markRaw(this) // eslint-disable-line
  }

  get state() {
    return this.reactiveState ? this.reactiveState.value : this.view.state
  }

  get storage() {
    return this.reactiveExtensionStorage ? this.reactiveExtensionStorage.value : super.storage
  }

  /**
   * Register a ProseMirror plugin.
   */
  registerPlugin(
    plugin,
    handlePlugins,
  ) {
    const nextState = super.registerPlugin(plugin, handlePlugins)

    if (this.reactiveState) {
      this.reactiveState.value = nextState
    }

    return nextState
  }

  /**
   * Unregister a ProseMirror plugin.
   */
  unregisterPlugin(nameOrPluginKey) {
    const nextState = super.unregisterPlugin(nameOrPluginKey)

    if (this.reactiveState && nextState) {
      this.reactiveState.value = nextState
    }

    return nextState
  }
}