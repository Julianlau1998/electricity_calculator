<template>
  <div class="settings-page">
    <div class="is-settings-box">
        <h1 class="header">
            {{ $t('settings.title') }}
        </h1>
        <div class="columns is-justify-content-center is-align-items-center">
            <div class="column is-3">
                <h3>
                    {{ $t('settings.currency') }}
                </h3>
            </div>
            <div class="column is-3">
                <select class="select" v-model="currency">
                    <option value="">
                        -
                    </option>
                    <option value="£">
                        {{ $t('settings.currencies.pound') }}
                    </option>
                    <option value="€">
                        {{ $t('settings.currencies.euro') }}
                    </option>
                    <option value="$" default>
                        {{ $t('settings.currencies.dollar') }}
                    </option>
                </select>
            </div>
        </div>

        <div class="columns is-justify-content-center is-align-items-center mb-6 mt-4">
            <div class="column is-3">
                <h3>
                    {{ $t('settings.language') }}
                </h3>
            </div>
            <div class="column is-3">
                <select
                    v-model="selectedLanguage"
                    class="select"
                    id="language"
                >
                    <option
                    v-for="(lang, i) in langs" :key="`Lang${i}`"
                    :value="lang"
                    >
                        {{ lang }}
                    </option>
                </select>
            </div>
        </div>
    </div>
    <button @click="home" class="button is-home-button mb-6">
        {{ $t('settings.home') }}
    </button>
    <br>
   <button v-if="iosApp" class="button is-support-button" id="support" @click="support">
      Get Rid Of Ads
   </button>
<!--    <button v-if="iosApp" class="button is-support-button" id="support" @click="restore">
      Restore Purchase
    </button>-->
  </div>
</template>

<script>
export default {
    data () {
        return {
            currency: '',
            language: '',
            langs: ['English', 'German'],
            selectedLanguage: ''
        }
    },
    created () {
        const localCurrency = localStorage.getItem('currency')
        if (localCurrency) {
            this.currency = JSON.parse(localCurrency)
        }
        this.selectedLanguage = localStorage.getItem('language')
        if (this.selectedLanguage) {
          this.selectedLanguage = JSON.parse(this.selectedLanguage)
        } else {
          this.selectedLanguage = ''
        }
    },
    computed: {
      iosApp () {
        return window.webkit && window.webkit.messageHandlers
      }
    },
    watch: {
        currency (val) {
            localStorage.setItem('currency', JSON.stringify(val))
        },
        selectedLanguage (val) {
          this.$i18n.locale = val
          localStorage.setItem('language', JSON.stringify(val))
        }
    },
    methods: {
        home () {
            this.$router.back()
        },
        support () {
          if (this.iosApp && window.webkit.messageHandlers.toggleMessageHandler) {
            window.webkit.messageHandlers.toggleMessageHandler.postMessage({
              "message": 'Trigger reward-ad:'
            });
          }
        },
        restore () {
          if (this.iosApp && window.webkit.messageHandlers.restorePurchase) {
            window.webkit.messageHandlers.restorePurchase.postMessage({
              "message": 'restore'
            });
          }
        }
    }
}
</script>