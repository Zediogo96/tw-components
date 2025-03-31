import MultiStepForm from '@/components/multi-step-form';

// src/app.jsx
export default function App() {
    return (
        <div className="h-screen w-screen flex items-center justify-center px-16 bg-white">
            <div className="absolute inset-0 bg-white">
                <div
                    className="absolute inset-0 opacity-[0.07]"
                    style={{
                        backgroundImage: `
        repeating-linear-gradient(
          -45deg,
          #3b82f6 0px,
          #3b82f6 1px,
          transparent 1px,
          transparent 10px,
          #8b5cf6 10px,
          #8b5cf6 11px,
          transparent 11px,
          transparent 20px,
          #ec4899 20px,
          #ec4899 21px,
          transparent 21px,
          transparent 30px
        )
      `,
                        backgroundSize: '42.4px 42.4px', // 30px * sqrt(2)
                    }}
                />
                <div className="absolute inset-0 bg-gradient-to-br from-white via-white/0 to-white" />
            </div>
            <MultiStepForm />
        </div>
    );
}
