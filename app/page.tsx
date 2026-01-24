import { AnimatedCard } from './components/AnimatedCard';
import { AnimatedButton } from './components/AnimatedButton';
import { CounterAnimation } from './components/CounterAnimation';
import { FloatingElements } from './components/FloatingElements';
import { LoadingSpinner } from './components/LoadingSpinner';

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 relative overflow-hidden">
      {/* Background animations */}
      <FloatingElements 
        count={15} 
        maxSize={150}
        colorScheme="mixed"
      />
      
      <div className="container mx-auto px-4 py-16 relative z-10">
        <header className="mb-12 text-center">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Animation Demo
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            A collection of reusable animated UI components for Next.js applications
          </p>
        </header>

        {/* Counter animation section */}
        <section className="mb-16 py-12">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
              <CounterAnimation end={9875} suffix="+" />
              <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">Happy Customers</p>
            </div>
            
            <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
              <CounterAnimation start={95} end={99.8} decimals={1} suffix="%" />
              <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">Customer Satisfaction</p>
            </div>
            
            <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
              <CounterAnimation end={150} prefix="$" suffix="M" />
              <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">Revenue Generated</p>
            </div>
          </div>
        </section>
        
        {/* Loading spinners section */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6 text-center">Loading Spinners</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
              <LoadingSpinner size="sm" color="blue" thickness="thin" />
            </div>
            <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
              <LoadingSpinner size="md" color="purple" thickness="regular" />
            </div>
            <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
              <LoadingSpinner size="lg" color="green" thickness="thick" />
            </div>
            <div className="p-6 bg-gradient-to-br from-blue-600 to-purple-700 rounded-lg shadow-md">
              <LoadingSpinner size="md" color="white" thickness="regular" />
            </div>
          </div>
        </section>
        
        {/* Animated buttons section */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6 text-center">Animated Buttons</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg">
            <div className="flex flex-col gap-4">
              <h3 className="font-semibold mb-2">Primary Variants</h3>
              <AnimatedButton size="sm">Small Button</AnimatedButton>
              <AnimatedButton size="md">Medium Button</AnimatedButton>
              <AnimatedButton size="lg">Large Button</AnimatedButton>
            </div>
            
            <div className="flex flex-col gap-4">
              <h3 className="font-semibold mb-2">Secondary Variants</h3>
              <AnimatedButton variant="secondary" size="sm">Small Button</AnimatedButton>
              <AnimatedButton variant="secondary" size="md">Medium Button</AnimatedButton>
              <AnimatedButton variant="secondary" size="lg">Large Button</AnimatedButton>
            </div>
            
            <div className="flex flex-col gap-4">
              <h3 className="font-semibold mb-2">Outline Variants</h3>
              <AnimatedButton variant="outline" size="sm">Small Button</AnimatedButton>
              <AnimatedButton variant="outline" size="md">Medium Button</AnimatedButton>
              <AnimatedButton variant="outline" size="lg">Large Button</AnimatedButton>
            </div>
          </div>
        </section>
        
        {/* Animated cards section */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6 text-center">Animated Cards</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <AnimatedCard
              title="Interactive Design"
              description="Hover and click to see different animations. Cards respond to user interactions with smooth transitions and transforms."
              colorScheme="blue"
            />
            <AnimatedCard
              title="Responsive Layout"
              description="All components adapt beautifully to different screen sizes and maintain their visual appeal across devices."
              colorScheme="purple"
            />
            <AnimatedCard
              title="Performance Optimized"
              description="Animations are carefully crafted to ensure smooth performance using CSS transitions and transforms."
              colorScheme="green"
            />
          </div>
        </section>
        
        {/* Animation showcase */}
        <section className="relative">
          <h2 className="text-2xl font-bold mb-6 text-center">Animation Playground</h2>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg relative overflow-hidden h-64">
            {/* Inner floating elements with different settings */}
            <div className="absolute inset-0">
              <FloatingElements 
                count={10} 
                maxSize={40}
                minSize={10}
                colorScheme="blue"
              />
            </div>
            
            <div className="relative z-10 flex items-center justify-center h-full">
              <div className="text-center">
                <h3 className="text-xl font-bold mb-4">Interactive Animation Demo</h3>
                <p className="mb-6 max-w-md mx-auto">
                  This container demonstrates how animations can be layered and composed together.
                </p>
                <LoadingSpinner size="md" color="purple" thickness="regular" />
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
