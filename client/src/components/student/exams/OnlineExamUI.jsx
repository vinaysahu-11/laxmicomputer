import React, { useState, useEffect } from 'react';

const OnlineExamUI = ({ test, onSubmitTest, onClose }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(2700); // 45 mins in seconds

  const questions = [
    {
      q: 'Which React Hook is primarily used to handle component side-effects?',
      options: ['useState', 'useContext', 'useEffect', 'useReducer'],
      ans: 2
    },
    {
      q: 'How do you define a route dynamic parameter in React Router?',
      options: ['route/:id', 'route?id', 'route.id', 'route#id'],
      ans: 0
    },
    {
      q: 'Which of the following is true about Redux state store?',
      options: ['State is read-only', 'State can be updated directly', 'State is mutable', 'State is stored in cookies'],
      ans: 0
    }
  ];

  // Timer Countdown Effect
  useEffect(() => {
    if (timeLeft <= 0) {
      handleAutoSubmit();
      return;
    }
    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleAutoSubmit = () => {
    onSubmitTest('Time has expired! Your exam has been submitted automatically.');
  };

  const handleSelectOption = (index) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [currentQuestion]: index
    }));
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const handleSubmit = () => {
    if (window.confirm('Do you want to finalize and submit your test answers?')) {
      const answeredCount = Object.keys(selectedAnswers).length;
      onSubmitTest(`Test submitted successfully! You answered ${answeredCount} out of ${questions.length} questions.`);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="p-5 space-y-6 text-left bg-surface rounded-xl border border-outline-variant/60 shadow-lg">
      
      {/* Exam Header */}
      <div className="flex justify-between items-center border-b border-outline-variant/30 pb-3 flex-wrap gap-3 bg-surface-container-low/50 p-3 rounded-lg">
        <div>
          <span className="text-[8px] bg-primary text-on-primary px-2 py-0.5 rounded font-bold uppercase tracking-wider">Exam Session Active</span>
          <h4 className="font-headline-sm text-headline-sm font-bold text-on-surface leading-none mt-1">{test?.title}</h4>
        </div>
        
        {/* Timer Widget */}
        <div className="flex items-center gap-2 bg-error-container/20 border border-error-container/45 text-error px-3.5 py-1.5 rounded-lg font-bold">
          <span className="material-symbols-outlined text-base animate-pulse">timer</span>
          <span className="text-xs uppercase tracking-wider">Time Left: {formatTime(timeLeft)}</span>
        </div>
      </div>

      {/* Instructions preview wrapper */}
      <div className="bg-surface-container-low p-3 rounded-lg border border-outline-variant/20 leading-relaxed text-[11px] text-on-surface-variant">
        <strong>Instructions:</strong> Avoid reloading this window. Multiple browser-tab switching events will lock this portal session immediately.
      </div>

      {/* Question Card */}
      <div className="p-5 bg-surface-container-lowest border border-outline-variant/50 rounded-xl space-y-4 shadow-sm">
        <div className="flex justify-between items-center gap-3">
          <span className="text-[10px] text-primary font-bold uppercase tracking-wider">Question {currentQuestion + 1} of {questions.length}</span>
          <span className="text-[10px] text-on-surface-variant font-medium bg-surface-container px-2 py-0.5 rounded">Single Choice</span>
        </div>

        <h5 className="font-label-md text-label-md font-bold text-on-surface leading-snug">
          {questions[currentQuestion].q}
        </h5>

        <div className="space-y-2 pt-2">
          {questions[currentQuestion].options.map((opt, i) => {
            const isSelected = selectedAnswers[currentQuestion] === i;
            return (
              <div 
                key={i}
                onClick={() => handleSelectOption(i)}
                className={`p-3 rounded-lg border cursor-pointer select-none transition-all flex items-center gap-3 text-xs ${
                  isSelected 
                    ? 'bg-primary/10 text-primary border-primary font-bold shadow-sm' 
                    : 'bg-surface hover:bg-surface-container-high border-outline-variant/35 text-on-surface-variant'
                }`}
              >
                <span className="material-symbols-outlined text-[18px]">
                  {isSelected ? 'radio_button_checked' : 'radio_button_unchecked'}
                </span>
                <span>{opt}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Navigation Footer */}
      <div className="flex justify-between items-center border-t border-outline-variant/20 pt-4 flex-wrap gap-3">
        <div className="flex gap-2">
          <button 
            type="button"
            onClick={handlePrev}
            disabled={currentQuestion === 0}
            className="px-4 py-2 border border-outline-variant rounded-lg font-bold text-xs text-on-surface-variant hover:bg-surface-container transition-colors uppercase tracking-wider disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          <button 
            type="button"
            onClick={handleNext}
            disabled={currentQuestion === questions.length - 1}
            className="px-4 py-2 border border-outline-variant rounded-lg font-bold text-xs text-on-surface-variant hover:bg-surface-container transition-colors uppercase tracking-wider disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>

        <div className="flex gap-2">
          <button 
            type="button"
            onClick={onClose}
            className="px-4 py-2 border border-outline-variant rounded-lg font-bold text-xs text-on-surface-variant hover:bg-surface-container transition-colors uppercase tracking-wider"
          >
            Exit Exam
          </button>
          <button 
            type="button"
            onClick={handleSubmit}
            className="px-5 py-2 bg-primary hover:bg-surface-tint text-on-primary rounded-lg font-bold text-xs shadow-md transition-all uppercase tracking-wider active:scale-95 duration-100"
          >
            Submit Exam
          </button>
        </div>
      </div>

    </div>
  );
};

export default OnlineExamUI;
