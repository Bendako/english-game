"use client"

import React, { useState, useEffect, useCallback, useMemo } from 'react';

// Type Definitions
type QuestionType = {
  id: string;
  word: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
  image?: string;
};

type CategoryType = {
  id: string;
  name: string;
  icon: string;
  color: string;
};

type QuestionsType = {
  [key: string]: QuestionType[];
};

const EnglishLearningGame = () => {
  // מצבים בסיסיים
  const [gameState, setGameState] = useState<'menu' | 'category' | 'game' | 'result'>('menu');
  const [selectedCategory, setSelectedCategory] = useState<CategoryType | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState<QuestionType | null>(null);
  const [score, setScore] = useState<number>(0);
  const [answeredQuestions, setAnsweredQuestions] = useState<string[]>([]);
  const [feedback, setFeedback] = useState<string>('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [timer, setTimer] = useState<number>(30);
  const [timerActive, setTimerActive] = useState<boolean>(false);
  const [timerEnabled, setTimerEnabled] = useState<boolean>(true);
  const [autoPlayAudio, setAutoPlayAudio] = useState<boolean>(true);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [categoryQuestions, setCategoryQuestions] = useState<QuestionType[]>([]);
  
  // קטגוריות - מאוחסנות באמצעות useMemo
  const categories = useMemo<CategoryType[]>(() => [
    { id: 'basics', name: 'מילים בסיסיות', icon: '🔤', color: 'bg-blue-100' },
    { id: 'numbers', name: 'מספרים', icon: '🔢', color: 'bg-green-100' },
    { id: 'colors', name: 'צבעים', icon: '🎨', color: 'bg-yellow-100' },
    { id: 'animals', name: 'חיות', icon: '🐾', color: 'bg-red-100' },
    { id: 'letters', name: 'אותיות', icon: '📝', color: 'bg-purple-100' }
  ], []);
  
  // שאלות - מאוחסנות באמצעות useMemo
  const questions = useMemo<QuestionsType>(() => ({
    basics: [
      {
        id: 'b1',
        word: 'Hello',
        options: ['שלום', 'תודה', 'בבקשה', 'להתראות'],
        correctAnswer: 'שלום',
        explanation: 'Hello = שלום, היא מילת ברכה באנגלית'
      },
      {
        id: 'b2',
        word: 'Thank you',
        options: ['בבקשה', 'שלום', 'תודה', 'סליחה'],
        correctAnswer: 'תודה',
        explanation: 'Thank you = תודה, מילה להבעת הכרת תודה'
      },
      {
        id: 'b3',
        word: 'Yes',
        options: ['לא', 'אולי', 'כן', 'בבקשה'],
        correctAnswer: 'כן',
        explanation: 'Yes = כן, מילת הסכמה או אישור'
      },
      {
        id: 'b4',
        word: 'No',
        options: ['כן', 'לא', 'אולי', 'בבקשה'],
        correctAnswer: 'לא',
        explanation: 'No = לא, מילת שלילה'
      },
      {
        id: 'b5',
        word: 'Please',
        options: ['תודה', 'סליחה', 'שלום', 'בבקשה'],
        correctAnswer: 'בבקשה',
        explanation: 'Please = בבקשה, מילת נימוס לבקשה'
      },
      {
        id: 'b6',
        word: 'Goodbye',
        options: ['שלום', 'להתראות', 'תודה', 'בבקשה'],
        correctAnswer: 'להתראות',
        explanation: 'Goodbye = להתראות, מילת פרידה'
      },
      {
        id: 'b7',
        word: 'Sorry',
        options: ['סליחה', 'תודה', 'שלום', 'בבקשה'],
        correctAnswer: 'סליחה',
        explanation: 'Sorry = סליחה, מילה להבעת צער או התנצלות'
      }
    ],
    numbers: [
      {
        id: 'n1',
        word: 'One',
        options: ['שתיים', 'שלוש', 'אחד', 'ארבע'],
        correctAnswer: 'אחד',
        explanation: 'One = אחד, המספר הראשון'
      },
      {
        id: 'n2',
        word: 'Two',
        options: ['אחד', 'שתיים', 'שלוש', 'ארבע'],
        correctAnswer: 'שתיים',
        explanation: 'Two = שתיים, המספר שבא אחרי אחד'
      },
      {
        id: 'n3',
        word: 'Three',
        options: ['שתיים', 'ארבע', 'חמש', 'שלוש'],
        correctAnswer: 'שלוש',
        explanation: 'Three = שלוש, המספר שבא אחרי שתיים'
      },
      {
        id: 'n4',
        word: 'Five',
        options: ['חמש', 'ארבע', 'שש', 'שבע'],
        correctAnswer: 'חמש',
        explanation: 'Five = חמש, המספר שבא אחרי ארבע'
      },
      {
        id: 'n5',
        word: 'Ten',
        options: ['תשע', 'שמונה', 'עשר', 'אחת-עשרה'],
        correctAnswer: 'עשר',
        explanation: 'Ten = עשר, המספר שבא אחרי תשע'
      },
      {
        id: 'n6',
        word: 'Four',
        options: ['שלוש', 'ארבע', 'חמש', 'שש'],
        correctAnswer: 'ארבע',
        explanation: 'Four = ארבע, המספר שבא אחרי שלוש'
      },
      {
        id: 'n7',
        word: 'Seven',
        options: ['שש', 'שבע', 'שמונה', 'תשע'],
        correctAnswer: 'שבע',
        explanation: 'Seven = שבע, המספר שבא אחרי שש'
      }
    ],
    colors: [
      {
        id: 'c1',
        word: 'Red',
        options: ['כחול', 'אדום', 'ירוק', 'צהוב'],
        correctAnswer: 'אדום',
        explanation: 'Red = אדום, צבע הדם והאש'
      },
      {
        id: 'c2',
        word: 'Blue',
        options: ['ירוק', 'אדום', 'כחול', 'צהוב'],
        correctAnswer: 'כחול',
        explanation: 'Blue = כחול, צבע השמיים והים'
      },
      {
        id: 'c3',
        word: 'Green',
        options: ['אדום', 'צהוב', 'כחול', 'ירוק'],
        correctAnswer: 'ירוק',
        explanation: 'Green = ירוק, צבע העשב והעצים'
      },
      {
        id: 'c4',
        word: 'Yellow',
        options: ['כתום', 'צהוב', 'ירוק', 'סגול'],
        correctAnswer: 'צהוב',
        explanation: 'Yellow = צהוב, צבע השמש והלימון'
      },
      {
        id: 'c5',
        word: 'Black',
        options: ['לבן', 'אפור', 'שחור', 'חום'],
        correctAnswer: 'שחור',
        explanation: 'Black = שחור, צבע הלילה'
      },
      {
        id: 'c6',
        word: 'White',
        options: ['שחור', 'אפור', 'לבן', 'חום'],
        correctAnswer: 'לבן',
        explanation: 'White = לבן, צבע הניגודיות לשחור'
      },
      {
        id: 'c7',
        word: 'Orange',
        options: ['סגול', 'כתום', 'ירוק', 'אדום'],
        correctAnswer: 'כתום',
        explanation: 'Orange = כתום, צבע הכתום של תפוז'
      }
    ],
    animals: [
      {
        id: 'a1',
        word: 'Dog',
        options: ['חתול', 'כלב', 'דג', 'ציפור'],
        correctAnswer: 'כלב',
        explanation: 'Dog = כלב, חיית המחמד הנפוצה ביותר'
      },
      {
        id: 'a2',
        word: 'Cat',
        options: ['כלב', 'חתול', 'סוס', 'ארנב'],
        correctAnswer: 'חתול',
        explanation: 'Cat = חתול, חיית מחמד שנוהגת לתפוס עכברים'
      },
      {
        id: 'a3',
        word: 'Bird',
        options: ['דג', 'ציפור', 'נחש', 'צפרדע'],
        correctAnswer: 'ציפור',
        explanation: 'Bird = ציפור, בעל חיים שיכול לעוף'
      },
      {
        id: 'a4',
        word: 'Fish',
        options: ['צפרדע', 'ציפור', 'דג', 'נחש'],
        correctAnswer: 'דג',
        explanation: 'Fish = דג, בעל חיים שחי במים'
      },
      {
        id: 'a5',
        word: 'Lion',
        options: ['אריה', 'נמר', 'זברה', 'ג׳ירפה'],
        correctAnswer: 'אריה',
        explanation: 'Lion = אריה, "מלך החיות"'
      },
      {
        id: 'a6',
        word: 'Horse',
        options: ['פרה', 'סוס', 'כבש', 'עז'],
        correctAnswer: 'סוס',
        explanation: 'Horse = סוס, בעל חיים גדול שמשמש לרכיבה'
      },
      {
        id: 'a7',
        word: 'Elephant',
        options: ['קוף', 'פיל', 'זברה', 'נמר'],
        correctAnswer: 'פיל',
        explanation: 'Elephant = פיל, בעל חיים גדול עם חדק ארוך'
      }
    ],
    letters: [
      {
        id: 'l1',
        word: 'A',
        options: ['B', 'A', 'C', 'D'],
        correctAnswer: 'A',
        explanation: 'A היא האות הראשונה באלפבית האנגלי, נהגית כמו "איי"',
        image: 'A'
      },
      {
        id: 'l2',
        word: 'B',
        options: ['A', 'C', 'B', 'D'],
        correctAnswer: 'B',
        explanation: 'B היא האות השנייה באלפבית האנגלי, נהגית כמו "בי"',
        image: 'B'
      },
      {
        id: 'l3',
        word: 'C',
        options: ['D', 'A', 'C', 'B'],
        correctAnswer: 'C',
        explanation: 'C היא האות השלישית באלפבית האנגלי, נהגית כמו "סי"',
        image: 'C'
      },
      {
        id: 'l4',
        word: 'E',
        options: ['F', 'G', 'D', 'E'],
        correctAnswer: 'E',
        explanation: 'E היא האות החמישית באלפבית האנגלי, נהגית כמו "אי"',
        image: 'E'
      },
      {
        id: 'l5',
        word: 'Z',
        options: ['Y', 'X', 'Z', 'W'],
        correctAnswer: 'Z',
        explanation: 'Z היא האות האחרונה באלפבית האנגלי, נהגית כמו "זי"',
        image: 'Z'
      },
      {
        id: 'l6',
        word: 'D',
        options: ['C', 'E', 'D', 'F'],
        correctAnswer: 'D',
        explanation: 'D היא האות הרביעית באלפבית האנגלי, נהגית כמו "די"',
        image: 'D'
      },
      {
        id: 'l7',
        word: 'G',
        options: ['F', 'H', 'G', 'E'],
        correctAnswer: 'G',
        explanation: 'G היא האות השביעית באלפבית האנגלי, נהגית כמו "ג׳י"',
        image: 'G'
      }
    ]
  }), []); // Empty dependency array means this will only be computed once

  // פונקציות עזר
  const speakWord = useCallback((word: string) => {
    if (!window.speechSynthesis) return;
    
    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(word);
      utterance.lang = 'en-US';
      utterance.rate = 0.7;
      utterance.pitch = 1.0;
      utterance.volume = 1.0;
      
      const voices = window.speechSynthesis.getVoices();
      const englishVoices = voices.filter(voice => voice.lang.includes('en-'));
      if (englishVoices.length > 0) {
        const femaleVoice = englishVoices.find(voice => voice.name.includes('female') || voice.name.includes('Female'));
        if (femaleVoice) {
          utterance.voice = femaleVoice;
        } else {
          utterance.voice = englishVoices[0];
        }
      }
      
      window.speechSynthesis.speak(utterance);
      
      setTimeout(() => {
        const repeatUtterance = new SpeechSynthesisUtterance(word);
        repeatUtterance.lang = 'en-US';
        repeatUtterance.rate = 0.6;
        repeatUtterance.volume = 1.0;
        if (utterance.voice) {
          repeatUtterance.voice = utterance.voice;
        }
        window.speechSynthesis.speak(repeatUtterance);
      }, 1200);
    } catch (err) {
      console.error("שגיאה בהשמעת מילה:", err);
    }
  }, []);

  // פונקציות ניהול משחק
  const selectCategory = useCallback((category: CategoryType) => {
    setSelectedCategory(category);
    setScore(0);
    setAnsweredQuestions([]);
    setGameState('game');
    
    // Prepare questions for the selected category
    const categoryId = category.id;
    const categoryQuestions = [...questions[categoryId]];
    
    // Shuffle questions
    for (let i = categoryQuestions.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [categoryQuestions[i], categoryQuestions[j]] = [categoryQuestions[j], categoryQuestions[i]];
    }
    
    setCategoryQuestions(categoryQuestions);
    setCurrentQuestionIndex(0);
    setCurrentQuestion(categoryQuestions[0]);
    
    if (timerEnabled) {
      setTimer(30);
      setTimerActive(true);
    }
  }, [questions, timerEnabled]);

  const handleAnswer = useCallback((answer: string | null) => {
    setShowFeedback(true);
    
    setTimerActive(false);
    
    if (!currentQuestion) return;
    
    const isCorrect = answer === currentQuestion.correctAnswer;
    
    if (isCorrect) {
      setScore(prevScore => prevScore + 1);
      setFeedback(`נכון! ${currentQuestion.explanation}`);
      
      // Automatically move to next question in the same category
      if (currentQuestionIndex < categoryQuestions.length - 1) {
        setTimeout(() => {
          setShowFeedback(false);
          setCurrentQuestionIndex(prevIndex => prevIndex + 1);
          setCurrentQuestion(categoryQuestions[currentQuestionIndex + 1]);
          
          if (timerEnabled) {
            setTimer(30);
            setTimerActive(true);
          }
        }, 1500);
        return;
      }
    } else {
      setFeedback(`לא נכון. התשובה הנכונה היא: ${currentQuestion.correctAnswer}. ${currentQuestion.explanation}`);
    }
    
    if (!answeredQuestions.includes(currentQuestion.id)) {
      setAnsweredQuestions(prev => [...prev, currentQuestion.id]);
    }
    
    // If all questions in the current category are answered
    if (currentQuestionIndex >= categoryQuestions.length - 1) {
      // Determine the next category
      const currentCategoryIndex = categories.findIndex(cat => cat.id === selectedCategory?.id);
      
      if (currentCategoryIndex < categories.length - 1) {
        // Move to the next category automatically
        setTimeout(() => {
          const nextCategory = categories[currentCategoryIndex + 1];
          selectCategory(nextCategory);
        }, 2000);
      } else {
        // If all categories are completed, end the game
        setTimeout(() => {
          setGameState('result');
        }, 2000);
      }
    }
  }, [
    currentQuestion, 
    currentQuestionIndex, 
    categoryQuestions, 
    timerEnabled, 
    answeredQuestions, 
    selectedCategory, 
    categories,
    selectCategory
  ]);

  const backToCategories = useCallback(() => {
    // Reset game state to category selection
    setGameState('category');
    
    // Reset all game-related states
    setSelectedCategory(null);
    setCurrentQuestion(null);
    setScore(0);
    setAnsweredQuestions([]);
    setShowFeedback(false);
    setTimerActive(false);
    setCategoryQuestions([]);
  }, []);

  // אפקטים
  useEffect(() => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.onvoiceschanged = () => {
        window.speechSynthesis.getVoices();
      };
      window.speechSynthesis.getVoices();
    }
  }, []);
  
  useEffect(() => {
    if ('speechSynthesis' in window && autoPlayAudio && currentQuestion) {
      setTimeout(() => speakWord(currentQuestion.word), 500);
    }
  }, [currentQuestion, autoPlayAudio, speakWord]);
  
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (timerEnabled && timerActive && timer > 0) {
      interval = setInterval(() => {
        setTimer(prevTimer => prevTimer - 1);
      }, 1000);
    } else if (timerEnabled && timerActive && timer === 0) {
      handleAnswer(null);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [timer, timerActive, timerEnabled, handleAnswer]);
  
  useEffect(() => {
    if (gameState === 'game' && selectedCategory) {
      const categoryId = selectedCategory.id;
      const categoryQuestions = [...questions[categoryId]];
      
      for (let i = categoryQuestions.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [categoryQuestions[i], categoryQuestions[j]] = [categoryQuestions[j], categoryQuestions[i]];
      }
      
      setCategoryQuestions(categoryQuestions);
      setCurrentQuestionIndex(0);
      setCurrentQuestion(categoryQuestions[0]);
      
      if (timerEnabled) {
        setTimer(30);
        setTimerActive(true);
      }
    }
  }, [gameState, questions, selectedCategory, timerEnabled]);

  const nextQuestion = () => {
    if (currentQuestionIndex < categoryQuestions.length - 1) {
      setShowFeedback(false);
      setCurrentQuestionIndex(prevIndex => prevIndex + 1);
      setCurrentQuestion(categoryQuestions[currentQuestionIndex + 1]);
      
      if (timerEnabled) {
        setTimer(30);
        setTimerActive(true);
      }
    }
  };

  const prevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setShowFeedback(false);
      setCurrentQuestionIndex(prevIndex => prevIndex - 1);
      setCurrentQuestion(categoryQuestions[currentQuestionIndex - 1]);
      
      if (timerEnabled) {
        setTimer(30);
        setTimerActive(true);
      }
    }
  };


  // רינדור ממשקים
  
  const renderMenu = () => (
    <div className="text-center">
      <h1 className="text-3xl font-bold mb-3">משחק לימוד אנגלית</h1>
      <p className="mb-4 text-gray-600">למד/י אנגלית בסיסית בצורה כיפית ואינטראקטיבית!</p>
      
      <div className="mb-3 p-3 bg-blue-50 rounded-lg">
        <p className="font-medium">תכונות המשחק:</p>
        <ul className="text-sm mt-1 text-gray-700">
          <li>• 5 קטגוריות שונות ללימוד</li>
          <li>• השמעת מילים באנגלית</li>
          <li>• אפשרות לכבות את הטיימר</li>
          <li>• ניווט בין שאלות</li>
        </ul>
      </div>
      
      <button
        onClick={() => setGameState('category')}
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg shadow-md transition-colors"
      >
        התחל/י משחק
      </button>
      
      <div className="mt-4 text-sm text-gray-500">
        <p>טיפ: לחץ/י על אייקון הרמקול כדי לשמוע את המילה באנגלית</p>
      </div>
    </div>
  );

  const renderCategoryMenu = () => (
    <div className="text-center">
      <h2 className="text-2xl font-bold mb-6">בחר/י קטגוריה</h2>
      <div className="grid grid-cols-2 gap-4">
        {categories.map(category => (
          <div 
            key={category.id}
            className={`${category.color} p-4 rounded-lg shadow cursor-pointer hover:shadow-lg transition-shadow`}
            onClick={() => selectCategory(category)}
          >
            <div className="text-4xl mb-2">{category.icon}</div>
            <div className="font-medium">{category.name}</div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderGame = () => (
    <div className="text-center">
      {currentQuestion ? (
        <>
          <div className="mb-2 flex justify-between items-center">
            <div>
              <span className="text-sm font-medium bg-blue-100 px-3 py-1 rounded-full">
                קטגוריה: {selectedCategory?.name}
              </span>
              <span className="text-sm font-medium bg-green-100 px-3 py-1 rounded-full mx-2">
                ניקוד: {score}/5
              </span>
              {timerEnabled && (
                <span className="text-sm font-medium bg-red-100 px-3 py-1 rounded-full">
                  זמן: {timer}
                </span>
              )}
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => setAutoPlayAudio(!autoPlayAudio)}
                className={`p-2 rounded-full ${autoPlayAudio ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-600'}`}
                title={autoPlayAudio ? 'השמעה אוטומטית מופעלת' : 'השמעה אוטומטית כבויה'}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217z" clipRule="evenodd" />
                </svg>
              </button>
              <button
                onClick={() => {
                  setTimerEnabled(!timerEnabled);
                  if (!timerEnabled) {
                    setTimer(30);
                    setTimerActive(true);
                  } else {
                    setTimerActive(false);
                  }
                }}
                className={`p-2 rounded-full ${timerEnabled ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-600'}`}
                title={timerEnabled ? 'טיימר מופעל' : 'טיימר כבוי'}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                </svg>
              </button>
              <button
                onClick={backToCategories}
                className="bg-gray-200 text-gray-600 p-2 rounded-full hover:bg-gray-300 transition-colors"
                title="חזרה לקטגוריות"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm.707-10.293a1 1 0 00-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L9.414 11H13a1 1 0 100-2H9.414l1.293-1.293z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            {currentQuestion.image ? (
              <div className="font-bold text-8xl mb-4 text-blue-600">{currentQuestion.image}</div>
            ) : (
              <h3 className="text-2xl font-bold mb-2 text-blue-600">{currentQuestion.word}</h3>
            )}
            
            <button 
              onClick={() => speakWord(currentQuestion.word)}
              className="bg-blue-500 text-white rounded-full p-2 mb-4 inline-flex items-center justify-center"
              aria-label="השמע"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217z" clipRule="evenodd" />
              </svg>
              <span className="ml-1">השמע מילה</span>
            </button>
            
            <p className="mb-4 text-gray-600">
              {selectedCategory?.id === 'letters' ? 'בחר/י את האות הנכונה:' : 'מה פירוש המילה?'}
            </p>
            
            <div className="grid grid-cols-2 gap-3 mt-4">
              {currentQuestion.options.map((option, index) => {
                return (
                  <button
                    key={index}
                    onClick={() => {
                      const selectedAnswer = option;
                      handleAnswer(selectedAnswer);
                    }}
                    className={`
                      font-medium py-2 px-4 rounded transition-all duration-300
                      ${showFeedback && option === currentQuestion.correctAnswer
                        ? 'bg-green-500 text-white scale-105' 
                        : 'bg-blue-50 hover:bg-blue-100 text-blue-700'
                      }
                    `}
                    disabled={showFeedback}
                  >
                    {option}
                  </button>
                );
              })}
            </div>
            
            <div className="flex justify-between mt-6">
              <button
                onClick={prevQuestion}
                disabled={currentQuestionIndex === 0}
                className={`px-3 py-1 rounded ${currentQuestionIndex === 0 ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-gray-300 hover:bg-gray-400 text-gray-800'}`}
              >
                &larr; שאלה קודמת
              </button>
              <button
                onClick={nextQuestion}
                disabled={currentQuestionIndex === categoryQuestions.length - 1}
                className={`px-3 py-1 rounded ${currentQuestionIndex === categoryQuestions.length - 1 ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-gray-300 hover:bg-gray-400 text-gray-800'}`}
              >
                שאלה הבאה &rarr;
              </button>
            </div>
          </div>
          
          {showFeedback && (
            <div className={`mt-4 p-3 rounded ${feedback.startsWith('נכון') ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
              {feedback}
              <button 
                onClick={() => speakWord(currentQuestion.word)}
                className="bg-blue-500 text-white rounded-full p-1 ml-2 inline-flex items-center justify-center"
                aria-label="השמע שוב"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="p-4 text-center">
          <p>טוען שאלה...</p>
        </div>
      )}
    </div>
  );

  const renderResult = () => (
    <div className="text-center bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-2">סיכום המשחק</h2>
      <div className="text-6xl mb-4">
        {score === 5 ? '🏆' : score >= 3 ? '😃' : '🙂'}
      </div>
      <p className="text-xl mb-4">
        הניקוד שלך: <span className="font-bold text-blue-600">{score}/5</span>
      </p>
      <p className="mb-6">
        {score === 5 
          ? 'מצוין! השגת ניקוד מושלם!' 
          : score >= 3 
            ? 'כל הכבוד! התקדמת יפה!' 
            : 'המשך/י להתאמן, את/ה תשתפר/י!'}
      </p>
      <div className="flex justify-center gap-3">
        <button
          onClick={backToCategories}
          className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded transition-colors"
        >
          חזרה לקטגוריות
        </button>
        <button
          onClick={() => {
            if (selectedCategory) {
              selectCategory(selectedCategory);
            }
          }}
          className="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded transition-colors"
        >
          נסה שוב
        </button>
      </div>
    </div>
  );

  // רינדור בהתאם למצב המשחק
  return (
    <div className="bg-gray-50 p-6 rounded-lg min-h-full" dir="rtl">
      {gameState === 'menu' && renderMenu()}
      {gameState === 'category' && renderCategoryMenu()}
      {gameState === 'game' && renderGame()}
      {gameState === 'result' && renderResult()}
    </div>
  );
};

export default EnglishLearningGame;