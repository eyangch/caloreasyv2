import tensorflow as tf
from tensorflow import keras
from tensorflow.keras import Sequential
from tensorflow.keras.layers import Dense, Dropout, Flatten
import cv2
import numpy as np
import tensorflowjs as tfjs

tf.logging.set_verbosity(tf.logging.ERROR)

xt = []
yt = []

labelfile = open("trainFood/labels.txt", "r")

numsamples = 0

nxt = int(labelfile.readline())

for i in range(numsamples):
    face = cv2.imread("trainFood/" + str(i) + ".png")
    onehot = np.zeros((1))
    if i == nxt:
        onehot[0] = 1
        try:
            nxt = int(labelfile.readline())
        except:
            nxt = -1
    #face = face.flatten()
    if i % 5 == 0 or onehot[0] == 1:
        xt.append(face / 255.0)
        yt.append(np.array(onehot, dtype="uint8"))
xt = np.array(xt, dtype="float32")
yt = np.array(yt, dtype="uint8")
print(xt)
print(yt)

fp = "models/sm-{epoch:02d}-{val_acc:.2f}.hd5"
ckpt = keras.callbacks.ModelCheckpoint(fp, monitor="val_acc", verbose=1, save_best_only=False, mode="max")

inew = input("Load model? ")

if inew == "y" or inew == "yes":
    model = keras.models.load_model("model.hd5")
else:
    model = Sequential()
    model.add(keras.layers.Conv2D(filters=8, kernel_size=8, activation="sigmoid", input_shape=(96, 96, 3)))
    model.add(keras.layers.MaxPool2D(pool_size=(3, 3)))
    model.add(keras.layers.Conv2D(filters=4, kernel_size=4, activation="sigmoid"))
    model.add(keras.layers.MaxPool2D(pool_size=(2, 2)))
    model.add(Flatten())
    model.add(Dense(32, activation="relu"))
    model.add(Dropout(0.2))
    model.add(Dense(16, activation="sigmoid"))
    model.add(Dropout(0.2))
    model.add(Dense(1, activation="sigmoid"))
    print(model.summary())
    model.compile(loss="mse", optimizer="adam", metrics=["accuracy"])
for layer in model.layers:
    print(layer.output_shape)
model.fit(x=xt, y=yt, batch_size=30, epochs=50, shuffle=True, validation_split=0.2, steps_per_epoch=3, callbacks=[ckpt])

tfjs.converters.save_keras_model(model, "savestuff")

