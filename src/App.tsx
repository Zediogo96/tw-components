import MultiStepForm from '@/components/multi-step-form';

// src/app.jsx
export default function App() {
    return (
        <div className="h-screen w-screen flex items-center justify-center px-16 bg-white">
            <div className="absolute inset-0 bg-white">
                <div
                    className="absolute inset-0 opacity-[0.15]"
                    style={{
                        backgroundImage: `
        repeating-linear-gradient(
          -45deg,
          #1a56db 0px,
          #1a56db 1px,
          transparent 1px,
          transparent 10px,
          #6d28d9 10px,
          #6d28d9 11px,
          transparent 11px,
          transparent 20px,
          #be185d 20px,
          #be185d 21px,
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
