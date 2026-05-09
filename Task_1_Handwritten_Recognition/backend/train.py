import os
import tensorflow as tf
from tensorflow.keras import layers, models

def train_mnist_model():
    print("Loading MNIST dataset...")
    mnist = tf.keras.datasets.mnist
    (x_train, y_train), (x_test, y_test) = mnist.load_data()

    # Preprocess data: normalize to [0, 1] and reshape to (num_samples, 28, 28, 1)
    x_train = x_train.reshape((x_train.shape[0], 28, 28, 1)).astype('float32') / 255.0
    x_test = x_test.reshape((x_test.shape[0], 28, 28, 1)).astype('float32') / 255.0

    print("Building CNN architecture...")
    model = models.Sequential([
        layers.Conv2D(32, (3, 3), activation='relu', input_shape=(28, 28, 1)),
        layers.MaxPooling2D((2, 2)),
        layers.Conv2D(64, (3, 3), activation='relu'),
        layers.MaxPooling2D((2, 2)),
        layers.Conv2D(64, (3, 3), activation='relu'),
        layers.Flatten(),
        layers.Dense(64, activation='relu'),
        layers.Dense(10, activation='softmax') # 10 classes for digits 0-9
    ])

    model.compile(optimizer='adam',
                  loss='sparse_categorical_crossentropy',
                  metrics=['accuracy'])

    print("Training model...")
    # Train for 5 epochs for speed. In production, consider more epochs and validation splits.
    model.fit(x_train, y_train, epochs=5, batch_size=64, validation_split=0.1)

    print("Evaluating model...")
    test_loss, test_acc = model.evaluate(x_test,  y_test, verbose=2)
    print(f"Test accuracy: {test_acc}")

    # Save model
    model_dir = os.path.join(os.path.dirname(__file__), 'model')
    os.makedirs(model_dir, exist_ok=True)
    model_path = os.path.join(model_dir, 'mnist_cnn.keras')
    
    model.save(model_path)
    print(f"Model saved to {model_path}")

if __name__ == '__main__':
    train_mnist_model()
