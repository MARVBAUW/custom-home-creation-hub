
import React from 'react';
import MessageDisplay from './components/conversational/MessageDisplay';
import InputArea from './components/conversational/InputArea';
import MessageProcessor from './components/conversational/MessageProcessor';
import { useConversationalEstimator, ConversationalEstimatorProps } from './hooks/useConversationalEstimator';

const ConversationalEstimator: React.FC<ConversationalEstimatorProps> = (props) => {
  const {
    messages,
    loading,
    userInput,
    setUserInput,
    messagesEndRef,
    handleSendMessage,
    handleOptionClick,
    handleKeyPress,
    conversationState
  } = useConversationalEstimator(props);

  return (
    <div className="flex flex-col h-[500px] border rounded-lg overflow-hidden bg-white">
      {/* Processeur de messages - composant invisible pour la logique */}
      <MessageProcessor
        onUserInput={props.onUserInput}
        formData={props.formData}
        updateFormData={props.updateFormData}
      />
      
      {/* Affichage des messages */}
      <MessageDisplay 
        messages={messages} 
        loading={loading} 
        onOptionClick={handleOptionClick} 
        messagesEndRef={messagesEndRef} 
      />
      
      {/* Zone de saisie */}
      <InputArea 
        userInput={userInput} 
        setUserInput={setUserInput} 
        handleSendMessage={handleSendMessage} 
        handleKeyPress={handleKeyPress} 
      />
      
      {/* Indicateur de progression optionnel */}
      {conversationState.formProgress > 0 && (
        <div className="p-2 bg-gray-100 border-t">
          <div className="w-full h-1.5 bg-gray-200 rounded-full">
            <div 
              className="h-1.5 bg-green-500 rounded-full transition-all duration-500"
              style={{ width: `${conversationState.formProgress}%` }}
            ></div>
          </div>
          <div className="text-xs text-gray-500 mt-1 text-right">
            {conversationState.formProgress < 100 
              ? `Informations collectées: ${conversationState.formProgress}%` 
              : "Toutes les informations essentielles ont été collectées"}
          </div>
        </div>
      )}
    </div>
  );
};

export default ConversationalEstimator;
