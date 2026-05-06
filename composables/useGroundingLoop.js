// composables/useGroundingLoop.js
import { ref, computed } from 'vue'
import partsData from '~/data/violinParts.json'

export function useGroundingLoop() {

    // ── Reactive state ──
    const currentState = ref('IDLE')
    const candidates = ref([])
    const selectedItem = ref(null)
    const selectedIntent = ref(null)
    const errorMessage = ref('')
    const history = ref([])
    const items = partsData.items
    const intents = partsData.intents
    // ── Computed helpers ──
    const isAmbiguous = computed(
    () => candidates.value.length > 1
    )
    const stateLabel = computed(() => {
        const labels = {
        IDLE: 'Ready to explore',
        SENSE: 'Sensing...',
        INTERPRET: 'Interpreting what I see...',
        GROUND: 'Let me make sure I understand...',
        ACT: 'Here is what I found'
        }
        return labels[currentState.value] || ''
    })

    // ── SENSE ──
    // Called when user clicks on a tool
    function sense(clickedItemId) {
        currentState.value = 'SENSE'
        errorMessage.value = ''
        selectedItem.value = null
        selectedIntent.value = null
        setTimeout(() => interpret(clickedItemId), 600)
    }

    // ── INTERPRET ──
    // Find the item and check for ambiguity
    function interpret(clickedItemId) {
        currentState.value = 'INTERPRET'
        const item = items.find(
            i => i.id === clickedItemId
        )
        if (!item) {
            errorMessage.value = 'I could not recognise that area.'
            currentState.value = 'IDLE'
            return
        }
        if (item.ambiguityPair) {
            const pair = items.find(
                i => i.id === item.ambiguityPair
            )
            candidates.value = [item, pair].filter(Boolean)
        } else {
            candidates.value = [item]
        }
        setTimeout(() => ground(), 800)
    }

    // ── GROUND ──
    // If ambiguous, wait for user to choose
    function ground() {
        currentState.value = 'GROUND'
        if (!isAmbiguous.value) {
            selectedItem.value = candidates.value[0]
        }
    }
    
    // User resolves ambiguity
    function selectCandidate(itemId) {
        const item = candidates.value.find(
            i => i.id === itemId
        )
        if (item) {
            selectedItem.value = item
            errorMessage.value = ''
        }
    }
    // User selects what they want to know
    function selectIntent(intentId) {
        selectedIntent.value = intents.find(i => i.id === intentId)
        currentState.value = 'ACT'
        history.value.push({
            item: selectedItem.value.name,
            intent: selectedIntent.value.label,
            time: new Date().toLocaleTimeString()
        })
    }

    // ── REPAIR: go back to GROUND ──
    function repair() {
        errorMessage.value =
        'Let me ask again to make sure...'
        selectedItem.value = null
        selectedIntent.value = null
        currentState.value = 'GROUND'
    }
    // ── Full reset ──
    function reset() {
        currentState.value = 'IDLE'
        candidates.value = []
        selectedItem.value = null
        selectedIntent.value = null
        errorMessage.value = ''
    }

    return {
        currentState, candidates, selectedItem,
        selectedIntent, errorMessage, history,
        items, intents, stateLabel, isAmbiguous,
        sense, selectCandidate, selectIntent,
        repair, reset,
    }
}