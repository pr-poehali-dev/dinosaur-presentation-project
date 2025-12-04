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
    title: 'Триасовый период',
    subtitle: 'Начало эры динозавров (252-201 млн лет)',
    content: [
      'Первые динозавры были небольшими и быстрыми хищниками',
      'Эораптор — один из древнейших динозавров, длиной всего 1 метр',
      'Платеозавр — ранний травоядный динозавр до 10 метров в длину',
      'Климат был жарким и сухим, единый суперконтинент Пангея',
      'Динозавры конкурировали с другими архозаврами за господство'
    ],
    backgroundColor: 'from-[#9A7C5D] to-[#7D6449]',
  },
  {
    id: 4,
    title: 'Юрский период',
    subtitle: 'Золотой век гигантов (201-145 млн лет)',
    content: [
      'Эпоха крупнейших наземных животных в истории Земли',
      'Брахиозавр весил до 80 тонн и достигал 13 метров в высоту',
      'Диплодок — длиной до 35 метров с хвостом-кнутом',
      'Аллозавр — главный хищник юрского периода',
      'Появление первых птиц: Археоптерикс — переходное звено'
    ],
    backgroundColor: 'from-[#B89968] to-[#9A7C5D]',
  },
  {
    id: 5,
    title: 'Меловой период',
    subtitle: 'Пик разнообразия (145-66 млн лет)',
    content: [
      'Появление цветковых растений изменило экосистемы',
      'Тираннозавр Рекс — апекс-хищник с силой укуса 6 тонн',
      'Спинозавр — крупнейший хищник, охотился на рыбу',
      'Трицератопс — массивный травоядный с тремя рогами',
      'Появление современных континентов, разделение фаун'
    ],
    backgroundColor: 'from-[#C4A57B] to-[#B89968]',
  },
  {
    id: 6,
    title: 'Хищные динозавры',
    subtitle: 'Тероподы — короли охоты',
    content: [
      'Тираннозавр — длина 12 метров, вес 9 тонн, острейшие зубы',
      'Велоцираптор — умный стайный охотник с серповидным когтем',
      'Спинозавр — полуводный хищник с огромным парусом на спине',
      'Карнотавр — быстрый хищник с рогами и крошечными лапами',
      'Дейноних — прародитель образа хищных динозавров в кино'
    ],
    backgroundColor: 'from-[#8B6F47] to-[#6B5345]',
  },
  {
    id: 7,
    title: 'Травоядные гиганты',
    subtitle: 'Зауроподы — титаны мезозоя',
    content: [
      'Аргентинозавр — крупнейший динозавр, до 100 тонн веса',
      'Диплодок — один из длиннейших, до 35 метров',
      'Брахиозавр — жираф мезозоя, питался с верхушек деревьев',
      'Апатозавр (Бронтозавр) — мощный хвост использовался для защиты',
      'Питались сотнями килограммов растений ежедневно'
    ],
    backgroundColor: 'from-[#A0916D] to-[#8B6F47]',
  },
  {
    id: 8,
    title: 'Рогатые и бронированные',
    subtitle: 'Защитники травоядного мира',
    content: [
      'Трицератопс — три рога и костяной воротник для защиты',
      'Стегозавр — костяные пластины на спине и шипастый хвост',
      'Анкилозавр — живой танк с костяной броней и булавой',
      'Пахицефалозавр — толстый костяной купол черепа для боёв',
      'Эти динозавры могли противостоять крупнейшим хищникам'
    ],
    backgroundColor: 'from-[#B5996B] to-[#A0916D]',
  },
  {
    id: 9,
    title: 'Образ жизни и поведение',
    content: [
      'Социальное поведение: Многие динозавры жили стадами',
      'Охота и защита: Развитые стратегии выживания',
      'Забота о потомстве: Строили гнезда и защищали детенышей',
      'Коммуникация: Звуковые сигналы и визуальные дисплеи',
      'Миграции: Преодолевали большие расстояния в поисках пищи'
    ],
    backgroundColor: 'from-[#C4A57B] to-[#B5996B]',
  },
  {
    id: 10,
    title: 'Удивительные факты',
    subtitle: 'То, что вы не знали о динозаврах',
    content: [
      'У многих динозавров были перья, а не чешуя',
      'Стегозавр имел мозг размером с грецкий орех при весе 5 тонн',
      'Микрораптор умел планировать на четырёх крыльях',
      'Яйца динозавров были размером от теннисного мяча до футбольного',
      'Некоторые динозавры могли развивать скорость до 70 км/ч'
    ],
    backgroundColor: 'from-[#D4A574] to-[#C4A57B]',
  },
  {
    id: 11,
    title: 'Летающие рептилии',
    subtitle: 'Птерозавры — властелины неба',
    content: [
      'Птеранодон — размах крыльев до 7 метров, питался рыбой',
      'Кетцалькоатль — крупнейшее летающее существо, размах 10-11 метров',
      'Диморфодон — небольшой птерозавр с крупной головой',
      'Крылья из кожистой мембраны, натянутой на удлинённый палец',
      'Не динозавры, но родственные рептилии мезозойской эры'
    ],
    backgroundColor: 'from-[#A08D6F] to-[#8B7355]',
  },
  {
    id: 12,
    title: 'Морские рептилии',
    subtitle: 'Хищники древних океанов',
    content: [
      'Мозазавры — морские ящеры длиной до 17 метров',
      'Плезиозавры — длинная шея и ласты, охотились на рыбу',
      'Плиозавры — короткая шея, мощные челюсти, супер-хищники',
      'Ихтиозавры — похожи на дельфинов, быстрые пловцы',
      'Эти рептилии господствовали в морях параллельно динозаврам на суше'
    ],
    backgroundColor: 'from-[#8B7D5F] to-[#75634B]',
  },
  {
    id: 13,
    title: 'Причины вымирания',
    content: [
      'Падение астероида (66 млн лет назад): Удар в районе современной Мексики',
      'Последствия удара: Цунами, пожары, ядерная зима',
      'Вулканическая активность: Деканские траппы в Индии',
      'Климатические изменения: Резкое похолодание и вымирание растений',
      'Выжили только мелкие животные, включая предков современных птиц'
    ],
    backgroundColor: 'from-[#6B5345] to-[#4A3A2A]',
  },
  {
    id: 14,
    title: 'Палеонтология сегодня',
    subtitle: 'Изучение древней жизни',
    content: [
      'Ежегодно открывают 40-50 новых видов динозавров',
      'Современные технологии: КТ-сканирование, изотопный анализ',
      'Изучение ДНК из костей возрастом миллионы лет',
      'Реконструкция облика: цвет перьев, мягкие ткани',
      'Динамические модели передвижения и биомеханики'
    ],
    backgroundColor: 'from-[#9A8266] to-[#7D6B52]',
  },
  {
    id: 15,
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