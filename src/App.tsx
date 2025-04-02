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
          transparent 6px,
          #6d28d9 6px,
          #6d28d9 7px,
          transparent 7px,
          transparent 12px,
          #be185d 12px,
          #be185d 13px,
          transparent 13px,
          transparent 18px
        )
      `,
                        backgroundSize: '25.5px 25.5px', // 18px * sqrt(2)
                    }}
                />
                <div className="absolute inset-0 bg-gradient-to-br from-white via-white/0 to-white" />
            </div>
            <MultiStepForm />
        </div>
    );
}
