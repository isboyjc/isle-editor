<template>
  <div class="w-full h-100vh flex flex-col">
    <div class="w-full h-52px border-b-1 border-b-#e5e5e5 border-b-solid box-border flex justify-between">
      <div></div>
      <div class="h-full flex justify-end items-center">
        <div class="flex flex-col items-end justify-center text-0.8rem text-#737373 font-500" v-if="false">
          <span>{{ words }} words</span>
          <span>{{ characters }} characters</span>
        </div>
        <div class="flex justify-center items-center text-0.8rem text-#737373 font-500" v-else>empty</div>
        <div class="w-1px h-65% bg-#e5e5e5 ml-1rem mr-1rem"></div>
        <div class="w-65px pr-1rem" v-if="false">
          <span class="w-0.51em h-0.5em inline-block rounded-full bg-#16a34a mr-0.5rem"></span>
          <span class="text-0.9rem text-#737373 font-500">Editing</span>
        </div>
        <div class="w-65px pr-1rem" v-else>
          <span class="w-0.51em h-0.5em inline-block rounded-full bg-#e5e5e5 mr-0.5rem"></span>
          <span class="text-0.9rem text-#737373 font-500">Ready</span>
        </div>
      </div>
    </div>
    <div class="w-full w-full overflow-y-auto overflow-x-hidden flex flex-1">
      
    </div>
  </div>
</template>

<script setup>
</script>

<style></style>