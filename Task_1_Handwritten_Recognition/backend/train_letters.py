import tensorflow_datasets as tfds
import tensorflow as tf
from tensorflow.keras import layers, models
import os

def train_letters_model():
    print("Loading EMNIST Letters dataset via tfds...")
    # tfds has 'emnist/letters'
    ds_train, ds_test = tfds.load('emnist/letters', split=['train', 'test'], as_supervised=True)
    
    def preprocess(image, label):
        image = tf.cast(image, tf.float32) / 255.0
        # The images in EMNIST tfds are transposed, we transpose them to match canvas orientation
        image = tf.transpose(image, [1, 0, 2])
        # labels are 1-26 in tfds emnist/letters. subtract 1 to get 0-25
        label = label - 1
        return image, label

    ds_train = ds_train.map(preprocess).batch(128).prefetch(tf.data.AUTOTUNE)
    ds_test = ds_test.map(preprocess).batch(128).prefetch(tf.data.AUTOTUNE)

    print("Building CNN architecture...")
    model = models.Sequential([
        layers.Conv2D(32, (3, 3), activation='relu', input_shape=(28, 28, 1)),
        layers.MaxPooling2D((2, 2)),
        layers.Conv2D(64, (3, 3), activation='relu'),
        layers.MaxPooling2D((2, 2)),
        layers.Conv2D(64, (3, 3), activation='relu'),
        layers.Flatten(),
        layers.Dense(128, activation='relu'),
        layers.Dropout(0.3),
        layers.Dense(26, activation='softmax') # 26 classes for A-Z
    ])

    model.compile(optimizer='adam',
                  loss='sparse_categorical_crossentropy',
                  metrics=['accuracy'])

    print("Training model...")
    model.fit(ds_train, epochs=5, validation_data=ds_test)

    print("Evaluating model...")
    test_loss, test_acc = model.evaluate(ds_test, verbose=2)
    print(f"Test accuracy: {test_acc}")

    model_dir = os.path.join(os.path.dirname(__file__), 'model')
    os.makedirs(model_dir, exist_ok=True)
    model_path = os.path.join(model_dir, 'emnist_letters_cnn.keras')
    model.save(model_path)
    print(f"Model saved to {model_path}")

if __name__ == '__main__':
    train_letters_model()
