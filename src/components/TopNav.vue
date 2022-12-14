<template>
    <div class="is-topnav p-3 pb-4 pt-4">
        <div class="columns is-mobile">
            <div @click="home" class="column ml-4 is-pointer">
                <span>
                    Electricity-Calc
                </span>
            </div>
            <div class="column settingsWrapper">
                <div v-if="settings" class="settingsItems settings">
                    <span v-if="helpAvailable">
                        <span @click="openSettings" class="is-icon-container is-pointer mt-6 setting noselect">
                            <i
                                class="fas fa-wrench is-smallIcon"
                                @click="settings=!settings"
                            />
                            {{ $t('settings.title') }}
                        </span>
                    </span>
                    <div v-if=" iosApp" class="hr" />
                    <span v-if="helpAvailable && iosApp">
                        <span @click="removeAds" class="is-icon-container is-pointer mt-6 setting noselect">
                            Get Rid Of Ads
                        </span>
                    </span>
                    <!-- <div class="hr" />
                    <span v-if="helpAvailable">
                        <span @click="openHelp" class="is-pointer mt-6 setting noselect">
                            Help
                        </span>
                    </span> -->
                </div>
                <i
                    v-if="helpAvailable || playBillingSupported"
                    class="fas fa-bars settings-icon is-pointer"
                    @click="settings=!settings"
                />
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'TopNav',
    props: {
        helpAvailable: {
            required: false,
            default: true
        }
    },
    data () {
        return {
            settings: false,
            shareAvailable: false,
        }
    },
    created () {
        if(navigator.share !== undefined) {
            this.shareAvailable = true
        }
    },
    computed: {
      iosApp () {
        return window.webkit && window.webkit.messageHandlers
      }
    },
    methods: {
        openSettings () {
            if (this.$router.currentRoute.name === 'Plus' || this.$router.currentRoute.name === 'PlusSettings') {
              this.$router.push('plusSettings')
            } else {
              this.$router.push('settings')
            }
            this.settings = false
        },
        openHelp () {
            this.$router.push('help')
            this.settings = false
        },
        home () {
            this.$router.push('/')
        },
        removeAds () {
          if (this.iosApp && window.webkit.messageHandlers.toggleMessageHandler) {
            window.webkit.messageHandlers.toggleMessageHandler.postMessage({
              "message": 'Remove Ads:'
            });
          }
        }
    }
}
</script>