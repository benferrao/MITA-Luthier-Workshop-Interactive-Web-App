<template>
    <div class="app-container">
        <header class="app-header">
            <h1>The Violin Workshop</h1>
            <p>Explore Cremona's luthier tradition</p>
        </header>

        <!-- Always visible: current stage -->
        <LoopIndicator :current-state="currentState" />
            
        <!-- Status message -->
        <p v-if="stateLabel class="state-label">
            {{ stateLabel }}
        </p>
        <p v-if="errorMessage" class="error-msg">
            {{ errorMessage }}
        </p>
    
        <!-- IDLE: show the tools -->
        <ToolSelector v-if="currentState === 'IDLE'" :items="items" @select="sense" />
        
        <!-- SENSE / INTERPRET: loading -->
        <div v-if="currentState === 'SENSE' || currentState === 'INTERPRET'" class="loading-state">
            <div class="spinner" />
            <p>{{ stateLabel }}</p>
        </div>

        <!-- GROUND: disambiguation -->
        <DisambiguationPanel v-if="currentState === 'GROUND' && isAmbiguous && 
        !selectedItem" :candidates="candidates" @select="selectCandidate" />
        
        <!-- GROUND: intent selection -->
        <IntentPanel v-if="currentState === 'GROUND' && selectedItem"
        :item="selectedItem" :intents="intents" @select="selectIntent" />
        
        <!-- ACT: show the result -->
        <ResultPanel v-if="currentState === 'ACT'" :item="selectedItem"
        :intent="selectedIntent" @repair="repair" @reset="reset" />
        
        <!-- Voice input (always visible) -->
        <VoiceInput v-if="currentState !== 'IDLE'" @result="handleVoice" />
        
        <!-- History sidebar -->
        <aside v-if="history.length" class="history">
            <h4>Recent explorations</h4>
            <div v-for="(h, i) in history" :key="i" class="history-item">
                <strong>{{ h.item }}</strong>
                &mdash; {{ h.intent }}
                <small>{{ h.time }}</small>
            </div>
        </aside>
    </div>
</template>
<script setup>
    import { useGroundingLoop } from '~/composables/useGroundingLoop'
    
    const {
        currentState, candidates,
        selectedItem, selectedIntent,
        errorMessage, history,
        items, intents,
        stateLabel, isAmbiguous,
        sense, selectCandidate,
        selectIntent, repair, reset
    } = useGroundingLoop()

    function handleVoice(text) {
    const lower = text.toLowerCase()
        if (currentState.value === 'GROUND' && isAmbiguous.value && !selectedItem.value) {
            const match = candidates.value.find(
                c => lower.includes(
                c.name.toLowerCase())
            )
            if (match) selectCandidate(match.id)
        } else if (currentState.value === 'GROUND' && selectedItem.value) {
            if (lower.includes('use')) selectIntent('function')
            else if (lower.includes('sound')) selectIntent('sound')
            else if (lower.includes('history')) selectIntent('history')
            else if (lower.includes('compare')) selectIntent('compare')
        }
    }
</script>
<style>
    * { 
        box-sizing: border-box;
        margin: 0; 
        padding: 0; 
    }

    body {
        font-family: -apple-system,
        BlinkMacSystemFont, 'Segoe UI',
        Roboto, sans-serif;
        background: #f8f9fa;
        color: #1a1a2e;
    }

    .app-container {
        max-width: 800px;
        margin: 0 auto; padding: 20px;
    }

    .app-header {
        text-align: center;
        margin-bottom: 10px;
    }

    .app-header h1 { font-size: 28px; }

    .app-header p {
        color: #666; font-size: 15px;
    }

    .state-label {
        text-align: center; color: #2E75B6;
        font-weight: 500;
        margin-bottom: 16px;
    }

    .error-msg {
        text-align: center; color: #d32f2f;
        background: #ffebee;
        padding: 8px 16px;
        border-radius: 8px;
        margin-bottom: 16px;
    }

    .loading-state {
        text-align: center; padding: 60px 20px;
    }
    
    .spinner {
        width: 40px; height: 40px;
        border: 3px solid #e0e0e0;
        border-top-color: #2E75B6;
        border-radius: 50%;
        animation: spin 0.8s linear infinite;
        margin: 0 auto 16px;
    }

    @keyframes spin {
        to { transform: rotate(360deg); }
    }

    .history {
        margin-top: 40px; padding: 16px;
        background: white;
        border-radius: 12px;
        box-shadow: 0 1px 4px rgba(0,0,0,.06);
    }

    .history h4 {
        margin-bottom: 10px; color: #555;
    }

    .history-item {
        padding: 6px 0;
        border-bottom: 1px solid #f0f0f0;
        font-size: 14px;
    }

    .history-item small {
        display: block; color: #999;
        font-size: 12px;
    }
</style>