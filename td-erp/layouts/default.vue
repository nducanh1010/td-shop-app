<template>
  <v-locale-provider>
    <v-app class="bg-surface">
      <layout-main/>
      <v-main class="mr-md-4">
        <div class="mb-3 hr-layout bg-containerBg">
          <v-container
            fluid
            class="page-wrapper bg-background pt-md-8 rounded-xl"
          >
            <div class="maxWidth">
              <slot />
            </div>
          </v-container>
        </div>
      </v-main>
    </v-app>
  </v-locale-provider>
</template>
