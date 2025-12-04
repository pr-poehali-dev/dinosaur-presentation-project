import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface Slide {
  id: number;
  title: string;
  subtitle?: string;
  content: string[];
  image?: string;
  backgroundColor: string;
}

const slides: Slide[] = [
  {
    id: 1,
    title: 'Динозавры',
    subtitle: 'Путешествие в доисторический мир',
    content: [
      'Добро пожаловать в увлекательное путешествие по эпохе динозавров',
      'Узнайте о величайших существах, когда-либо ходивших по Земле',
      'От триасового периода до мелового вымирания'
    ],
    backgroundColor: 'from-[#8B7355] to-[#6B5345]',
  },
  {
    id: 2,
    title: 'История динозавров и эпохи',
    content: [
      'Триасовый период (252-201 млн лет назад): Появление первых динозавров',
      'Юрский период (201-145 млн лет назад): Расцвет гигантских динозавров',
      'Меловой период (145-66 млн лет назад): Наивысшее разнообразие видов',
      'Динозавры господствовали на Земле более 165 миллионов лет'
    ],
    backgroundColor: 'from-[#A0826D] to-[#8B7355]',
  },
  {
    id: 3,
    title: 'Различные виды динозавров',
    content: [
      'Тероподы: Хищные динозавры на двух ногах (T-Rex, Велоцираптор)',
      'Зауроподы: Гигантские травоядные с длинными шеями (Брахиозавр, Диплодок)',
      'Цератопсы: Рогатые динозавры (Трицератопс, Стиракозавр)',
      'Анкилозавры: Бронированные динозавры с булавами на хвостах',
      'Птерозавры: Летающие рептилии (не совсем динозавры, но жили рядом)'
    ],
    backgroundColor: 'from-[#B89968] to-[#A0826D]',
  },
  {
    id: 4,
    title: 'Образ жизни и поведение',
    content: [
      'Социальное поведение: Многие динозавры жили стадами',
      'Охота и защита: Развитые стратегии выживания',
      'Забота о потомстве: Строили гнезда и защищали детенышей',
      'Коммуникация: Звуковые сигналы и визуальные дисплеи',
      'Миграции: Преодолевали большие расстояния в поисках пищи'
    ],
    backgroundColor: 'from-[#C4A57B] to-[#B89968]',
  },
  {
    id: 5,
    title: 'Причины вымирания',
    content: [
      'Падение астероида (66 млн лет назад): Удар в районе современной Мексики',
      'Последствия удара: Цунами, пожары, ядерная зима',
      'Вулканическая активность: Деканские траппы в Индии',
      'Климатические изменения: Резкое похолодание и вымирание растений',
      'Выжили только мелкие животные, включая предков современных птиц'
    ],
    backgroundColor: 'from-[#8B7355] to-[#6B5345]',
  },
  {
    id: 6,
    title: 'Наследие динозавров в современности',
    content: [
      'Птицы — прямые потомки динозавров-теропод',
      'Палеонтология: Изучение ископаемых открывает новые факты',
      'Популярная культура: Фильмы, книги, музеи',
      'Научные открытия: Каждый год находят новые виды',
      'Вдохновение для технологий: Биомимикрия в современной инженерии'
    ],
    backgroundColor: 'from-[#D4A574] to-[#C4A57B]',
  },
];

export default function DinoPresentation() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const nextSlide = () => {
    if (currentSlide < slides.length - 1 && !isAnimating) {
      setIsAnimating(true);
      setCurrentSlide(currentSlide + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0 && !isAnimating) {
      setIsAnimating(true);
      setCurrentSlide(currentSlide - 1);
    }
  };

  const goToSlide = (index: number) => {
    if (!isAnimating) {
      setIsAnimating(true);
      setCurrentSlide(index);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => setIsAnimating(false), 600);
    return () => clearTimeout(timer);
  }, [currentSlide]);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') nextSlide();
      if (e.key === 'ArrowLeft') prevSlide();
    };
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [currentSlide, isAnimating]);

  const slide = slides[currentSlide];

  return (
    <div className="relative w-full h-screen overflow-hidden bg-gradient-to-br from-[#2C1810] to-[#1A0F08]">
      <div
        className={`absolute inset-0 bg-gradient-to-br ${slide.backgroundColor} transition-all duration-700 ease-in-out`}
        style={{
          opacity: isAnimating ? 0.8 : 1,
        }}
      />

      <div className="relative z-10 h-full flex flex-col">
        <div className="flex-1 flex items-center justify-center px-8 md:px-16 lg:px-24">
          <div
            className={`max-w-5xl w-full ${
              isAnimating ? 'opacity-0 translate-y-8' : 'opacity-100 translate-y-0'
            } transition-all duration-600`}
          >
            <div className="mb-8 animate-fade-in">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-[#E8DCC4] mb-4 drop-shadow-2xl">
                {slide.title}
              </h1>
              {slide.subtitle && (
                <p className="text-xl md:text-2xl text-[#D4A574] font-semibold">
                  {slide.subtitle}
                </p>
              )}
            </div>

            <div className="space-y-4 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              {slide.content.map((text, index) => (
                <div
                  key={index}
                  className="bg-[#2C1810]/30 backdrop-blur-sm p-4 md:p-6 rounded-lg border-l-4 border-[#D4A574] transform hover:scale-[1.02] transition-transform duration-300"
                  style={{
                    animationDelay: `${0.3 + index * 0.1}s`,
                  }}
                >
                  <p className="text-base md:text-lg lg:text-xl text-[#E8DCC4] leading-relaxed">
                    {text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="pb-8 px-8">
          <div className="flex items-center justify-between max-w-5xl mx-auto">
            <Button
              onClick={prevSlide}
              disabled={currentSlide === 0}
              variant="ghost"
              size="lg"
              className="text-[#E8DCC4] hover:text-[#D4A574] hover:bg-[#2C1810]/30 disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <Icon name="ChevronLeft" size={32} />
            </Button>

            <div className="flex items-center gap-3">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`h-3 rounded-full transition-all duration-300 ${
                    index === currentSlide
                      ? 'w-12 bg-[#D4A574]'
                      : 'w-3 bg-[#E8DCC4]/40 hover:bg-[#E8DCC4]/70'
                  }`}
                  aria-label={`Перейти к слайду ${index + 1}`}
                />
              ))}
            </div>

            <Button
              onClick={nextSlide}
              disabled={currentSlide === slides.length - 1}
              variant="ghost"
              size="lg"
              className="text-[#E8DCC4] hover:text-[#D4A574] hover:bg-[#2C1810]/30 disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <Icon name="ChevronRight" size={32} />
            </Button>
          </div>

          <div className="text-center mt-4">
            <p className="text-[#E8DCC4]/60 text-sm">
              {currentSlide + 1} / {slides.length}
            </p>
            <p className="text-[#E8DCC4]/40 text-xs mt-1">
              Используйте стрелки ← → для навигации
            </p>
          </div>
        </div>
      </div>

      <div className="absolute inset-0 pointer-events-none opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-[#D4A574] rounded-full filter blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#8B7355] rounded-full filter blur-3xl" />
      </div>
    </div>
  );
}
