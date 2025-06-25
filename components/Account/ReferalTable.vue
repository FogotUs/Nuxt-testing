<script setup lang="ts">
import { ref, computed } from 'vue'
import type { TableColumn } from '@nuxt/ui'
import type { ReferralNode } from '~/types'

/**
 * Нормализованный узел дерева для таблицы.
 */
interface TreeNode {
  id: string
  login: string
  referral_code: string
  children: TreeNode[]
}

/**
 * Рекурсивно преобразует исходный ReferralNode в TreeNode.
 *
 * @param {ReferralNode} node — исходный узел из API
 * @returns {TreeNode} нормализованный узел
 */
function mapNode(node: ReferralNode): TreeNode {
  return {
    id: node.id ?? node.login,
    login: node.login,
    referral_code: node.referral_code,
    children: node.children?.map(mapNode) ?? []
  }
}

const props = defineProps<{
  /** Массив узлов первого уровня */
  nodes: ReferralNode[]
}>()

/**
 * Вычисляемый массив данных для таблицы:
 * нормализуем каждый переданный узел и сразу берём их (и всех их потомков).
 */
const data = computed<TreeNode[]>(() => {
  // Для каждого элемента массива props.nodes делаем mapNode
  return props.nodes.map(mapNode)
})

/**
 * Массив раскрытых идентификаторов строк.
 */
const expanded = ref<string[]>([])

/**
 * Колонки таблицы: логин и реферальный код.
 */
const columns = ref<TableColumn<TreeNode>[]>([
  { id: 'title', header: 'Логин' },
  { accessorKey: 'referral_code', header: 'Реферальный код' },
])
</script>

<template>
  <div
      class="max-h-[25rem] overflow-y-auto
           border border-gray-300 dark:border-gray-700
           rounded-lg bg-white dark:bg-gray-900"
  >
    <UTable
        :data="data"
        :columns="columns"
        :getSubRows="(row: TreeNode) => row.children"
        v-model:expand="expanded"
        :ui="{
        root: 'min-w-full border-collapse bg-white text-gray-800 dark:bg-gray-900 dark:text-gray-200',
        th:   'border border-gray-300 bg-gray-100 text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200',
        td:   'border border-gray-300 empty:p-0 dark:border-gray-700 dark:text-gray-200'
      }"
    >
      <template #title-cell="{ row }">
        <div
            class="flex items-center
                 bg-gray-50 dark:bg-gray-800"
            :style="{ paddingLeft: `${row.depth * 3}rem` }"
        >
          <UButton
              v-if="row.getCanExpand()"
              variant="outline"
              color="neutral"
              size="xs"
              class="mr-2 text-gray-600 dark:text-gray-300"
              :icon="row.getIsExpanded() ? 'i-lucide-minus' : 'i-lucide-plus'"
              @click="row.toggleExpanded()"
          />
          <strong>{{ row.original.login }}</strong>
        </div>
      </template>
    </UTable>
  </div>
</template>
